export const useRAF = () => {
  const handlers = new Set<FrameRequestCallback>()

  let id: ReturnType<typeof requestAnimationFrame> | null

  const onTick: FrameRequestCallback = (frameTime) => {
    for (const handler of handlers) {
      handler(frameTime)
    }

    id = requestAnimationFrame(onTick)
  }

  onMounted(() => {
    id = requestAnimationFrame(onTick)
  })

  onBeforeUnmount(() => {
    if (id != null) {
      cancelAnimationFrame(id)
    }
  })

  return {
    onFrame: (handler: (frameTime: number) => void) => {
      const wrapped: FrameRequestCallback = (frameTime) => handler(frameTime)

      handlers.add(wrapped)

      return () => {
        handlers.delete(wrapped)
      }
    }
  }
}