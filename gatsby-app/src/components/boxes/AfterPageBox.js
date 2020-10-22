import AfterUploadBox from '../blocks/AfterUploadBox'
import { faAngleLeft, faCopy } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import copy from 'copy-to-clipboard'
import Countdown from 'react-countdown'
import { PAGE, PageContext } from '../../providers/page-provider'

const AfterPageBox = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const { response, setResponse, setPage } = useContext(PageContext)
  const linkNode = useRef(null)

  const resourceLink = useMemo(() => {
    return (process.env.GATSBY_API_URL ? process.env.GATSBY_API_URL : window.location.origin) + '/u/' + response.data.key
  }, [response.data])

  const selectLink = () => {
    try {
      const range = new Range()
      range.setStart(linkNode.current, 0)
      range.setEndAfter(linkNode.current)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    } catch (e) {
      console.log('Your browser is outdated', e)
    }
  }

  const handleCopyButton = (event) => {
    event.preventDefault()
    setShowTooltip(true)
    copy(resourceLink)
    setTimeout(() => setShowTooltip(false), 1000)
  }

  const handleLinkClick = (event) => {
    event.preventDefault()
    selectLink()
  }

  const dateRenderer = ({ days, hours, minutes, seconds }) => (
    <AfterUploadBox.DateFormat>
      {
        days !== 0
          ? <span className='date'>{days + (days === 1 ? ' day,' : ' days,')}</span>
          : null
      }
      <span>{hours < 10 ? `0${hours}:` : `${hours}:`}</span>
      <span>{minutes < 10 ? `0${minutes}:` : `${minutes}:`}</span>
      <span>{seconds < 10 ? `0${seconds}` : `${seconds}`}</span>
    </AfterUploadBox.DateFormat>
  )

  useEffect(() => {
    const copyText = (event) => {
      const select = window.getSelection()
      if (!select.isCollapsed) {
        return
      }
      selectLink()
      event.clipboardData.setData('text/plain', resourceLink)
      event.preventDefault()
    }

    selectLink()

    window.addEventListener('copy', copyText)
    return () => window.removeEventListener('copy', copyText)
  }, [resourceLink])

  return (
    <AfterUploadBox>
      <AfterUploadBox.Area background>
        <AfterUploadBox.TextBox>
          <AfterUploadBox.Link
            onClick={handleLinkClick}
            href={resourceLink}
          >
            <AfterUploadBox.Text
              ref={linkNode}
            >
              {resourceLink}
            </AfterUploadBox.Text>
          </AfterUploadBox.Link>
          <AfterUploadBox.Button
            top
            onClick={handleCopyButton}
          >
            <AfterUploadBox.Icon
              icon={faCopy}
              style={{ margin: '0 10px' }}
            />
            <AfterUploadBox.Tooltip active={showTooltip}>
              Copied!
            </AfterUploadBox.Tooltip>
          </AfterUploadBox.Button>
        </AfterUploadBox.TextBox>
      </AfterUploadBox.Area>
      <AfterUploadBox.DeleteTimeArea>
        <AfterUploadBox.DeleteTime>
          <span>Expires in:</span>
          <Countdown
            date={response.data.toDelete}
            zeroPadTime={2}
            renderer={dateRenderer}
          />
        </AfterUploadBox.DeleteTime>
      </AfterUploadBox.DeleteTimeArea>
      <AfterUploadBox.Back
        onClick={() => {
          setResponse({ data: {} })
          setPage({ pageId: PAGE.MAIN_PAGE })
        }}
      >
        <AfterUploadBox.Icon icon={faAngleLeft}/>
        Go back
      </AfterUploadBox.Back>
    </AfterUploadBox>
  )
}

export default AfterPageBox
