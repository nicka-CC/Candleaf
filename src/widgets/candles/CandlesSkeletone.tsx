import React from "react"
import ContentLoader from "react-content-loader"

const CandlesSkeletone = () => (
  <ContentLoader
    speed={1}
    width={255}
    height={230}
    viewBox="0 0 350 295"
    backgroundColor="#f3f3f3"
    foregroundColor="#b0acac"
  >
    <rect x="128" y="6" rx="18" ry="18" width="89" height="149"/>
    <rect x="33" y="194" rx="8" ry="8" width="153" height="12"/>
    <rect x="182" y="211" rx="8" ry="8" width="65" height="12"/>
  </ContentLoader>

)

export default CandlesSkeletone

