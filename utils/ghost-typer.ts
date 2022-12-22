type Action = {
  type: 'text',
  text: string
} | {
  type: 'effect',
  init: () => void,
  apply: () => Promise<void>
} | {
  type: 'delay',
  timeMs: number
} | {
  type: 'clear'
} | {
  type: 'deleteLine',
  count: number
} | {
  type: 'changeInterval',
  intervalMs: number
}

export class ScriptBuilder {
  static create () {
    return new ScriptBuilder()
  }

  actions: Action[] = []
  text (str: string) {
    this.actions.push({
      type: 'text',
      text: str
    })
    return this
  }
  effect (initFn: () => void, applyFn: () => Promise<void>) {
    this.actions.push({
      type: 'effect',
      init: initFn,
      apply: applyFn
    })
    return this
  }
  delay (timeMs: number) {
    this.actions.push({
      type: 'delay',
      timeMs
    })
    return this
  }
  clear () {
    this.actions.push({
      type: 'clear'
    })
    return this
  }
  deleteLine (count: number) {
    this.actions.push({
      type: 'deleteLine',
      count
    })
    return this
  }
  changeInterval (intervalMs: number) {
    this.actions.push({
      type: 'changeInterval',
      intervalMs
    })
    return this
  }
  build () {
    return this.actions
  }
}

interface UnsubscribeCallback {
  (): void
}

export class Event<T> {
  callbacks: Set<(data: T) => void> = new Set()
  on: (cb: (data: T) => void) => UnsubscribeCallback

  constructor () {
    this.on = (cb: (data: T) => void) => {
      const wrapped = cb.bind(undefined)
      this.callbacks.add(wrapped)

      return () => {
        this.callbacks.delete(wrapped)
      }
    }
  }
  emit (data: T) {
    for (const cb of this.callbacks) {
      cb(data)
    }
  }
}

export class GhostTyping {
  private textEvent = new Event<string>()
  onText = this.textEvent.on
  private stateEvent = new Event<'START' | 'STOP'>()
  onState = this.stateEvent.on
  initialInterval = 20

  state: 'START' | 'STOP' = 'STOP'
  private currentText = ''
  private remainingActions: Action[] = []
  private remainingTokens: string[] = []
  private interval = this.initialInterval
  private activeEffect: Promise<void> | null = null

  private timeoutHandle: ReturnType<typeof setTimeout> | null = null

  constructor (private actions: Action[]) {

  }

  private async reset () {
    if (this.activeEffect != null) {
      await this.activeEffect
    }
    // initialize everything back to original state
    for (const action of this.actions) {
      if (action.type === 'effect') {
        action.init()
      }
    }

    this.activeEffect = null
    this.currentText = ''
    this.remainingActions = this.actions.slice(0)
    this.remainingTokens = []
    this.interval = this.initialInterval

    if (this.timeoutHandle != null) {
      clearTimeout(this.timeoutHandle)
      this.timeoutHandle = null
    }
  }

  async start () {
    if (this.state !== 'STOP') {
      return
    }

    await this.reset()

    this.state = 'START'
    this.stateEvent.emit('START')
    this.textEvent.emit(this.currentText)
    this.tick()
  }

  async stop () {
    if (this.state !== 'START') {
      return
    }

    await this.reset()
    this.state = 'STOP'
    this.stateEvent.emit('STOP')
    this.textEvent.emit(this.currentText)
  }

  private shiftToken () {
    this.currentText += this.remainingTokens.shift()
  }

  private parseText (text: string): string[] {
    return text.match(/\s+|<\/?[a-zA-Z0-9]+(?:\s[^>]*?)?>|<[a-zA-Z0-9]+(?:\s[^>]*?)?\/>|./g)!
  }

   private async tick (): Promise<void> {
    if (this.remainingTokens.length > 0) {
      this.shiftToken()
      this.textEvent.emit(this.currentText)
      return this.nextTick(() => this.tick())
    }

    if (this.remainingActions.length === 0) {
      this.reset()
      this.state = 'STOP'
      this.stateEvent.emit('STOP')
      return
    }

    const action = this.remainingActions.shift()!

    switch (action.type) {
      case 'text': {
        this.remainingTokens = this.parseText(action.text)
        return this.tick()
      }
      case 'delay': {
        return this.nextTick(() => {
          this.tick()
        }, action.timeMs)
      }
      case 'deleteLine': {
        const lines = this.currentText.split(/<br\s*>/g)
        const newLines = lines.slice(0, Math.max(0, lines.length - 2))
        this.currentText = newLines.join('<br>')
        this.textEvent.emit(this.currentText)
        return this.nextTick(() => this.tick())
      }
      case 'effect': {
        const p = this.activeEffect = action.apply()
        await p
        return this.nextTick(() => {
          if (this.activeEffect === p) {
            this.tick()
          }
        })
      }
      case 'clear': {
        this.currentText = ''
        this.textEvent.emit(this.currentText)
        return this.nextTick(() => this.tick())
      }
      case 'changeInterval': {
        this.interval = action.intervalMs
        return this.tick()
      }
    }
  }

  private nextTick (handler: () => void, timeout = this.interval) {
    this.timeoutHandle = setTimeout(handler, timeout)
  }
}