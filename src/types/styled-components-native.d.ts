declare module 'styled-components/native' {
  import { NativeStyledInterface, DefaultTheme } from 'styled-components'
  const styled: NativeStyledInterface<DefaultTheme>
  export default styled
  export * from 'styled-components'
}
