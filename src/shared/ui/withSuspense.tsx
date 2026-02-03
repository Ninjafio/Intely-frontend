import { Suspense, type ComponentType } from 'react'

const withSuspense =
  <T extends object>(Component: ComponentType<T>) =>
  (props: T) =>
    (
      <Suspense>
        <Component {...props} />
      </Suspense>
    )

export default withSuspense
