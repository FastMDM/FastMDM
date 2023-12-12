// Based on https://github.com/zeit/next.js/tree/canary/examples/with-react-native-web
// and https://github.com/expo/expo-cli/blob/main/packages/webpack-config/web-default/index.html
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'
import { AppRegistry } from 'react-native'
import i18nextConfig from '../next-i18next.config'


export const style = `
/**
 * Building on the RNWeb reset:
 * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/initialRules.js
 */
html, body, #__next {
  width: 100%;
  /* To smooth any scrolling behavior */
  -webkit-overflow-scrolling: touch;
  margin: 0px;
  padding: 0px;
  /* Allows content to fill the viewport and go beyond the bottom */
  min-height: 100%;
}
#__next {
  flex-shrink: 0;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 1;
  display: flex;
  flex: 1;
}
html {
  scroll-behavior: smooth;
  /* Prevent text size change on orientation change https://gist.github.com/tfausak/2222823#file-ios-8-web-app-html-L138 */
  -webkit-text-size-adjust: 100%;
  height: 100%;
}
body {
  display: flex;
  /* Allows you to scroll below the viewport; default value is visible */
  overflow-y: auto;
  overscroll-behavior-y: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-overflow-style: scrollbar;
}
`

export async function getInitialProps({ renderPage }) {
  AppRegistry.registerComponent('Main', () => Main)
  const { getStyleElement } = AppRegistry.getApplication('Main')
  const page = await renderPage()
  const styles = [
    <style key="style-reset" dangerouslySetInnerHTML={{ __html: style }} />,
    getStyleElement(),
  ]
  return { ...page, styles: React.Children.toArray(styles) }
}

export class Document extends NextDocument{
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale ??
      i18nextConfig.i18n.defaultLocale
    return (
      <Html lang={currentLocale}>
        <Head>
          <meta charSet="utf-8" />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400|Oswald:600"
            rel="stylesheet"
          />
          <link
            data-react-helmet="true"
            rel="icon"
            href="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-L9iS6Wm2hynS5H9Gj7j%2Favatar.png?generation=1523462254548780&amp;alt=media"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

Document.getInitialProps = getInitialProps

export default Document
