import React, { useEffect, useMemo, useState } from 'react'
import { ENState } from './ENState'
import { ENMethods } from './ENMethods'

export function ENHtml({ codes = [] }) {
  ENState.makeKeyReactive('overlay')

  useEffect(() => {
    let h = (e) => {
      if (e.key.toLowerCase() === 'escape') {
        ENState.overlay = ''
      }
    }

    window.addEventListener('keydown', h)
    return () => {
      window.removeEventListener('keydown', h)
    }
  })

  return ENState.overlay ? (
    <div
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: `100%`,
        backgroundColor: 'rgba(255,255,255,0.92)'
      }}
    >
      {ENState.overlay === 'main' && <MainPanel codes={codes}></MainPanel>}

      {ENState.overlay === 'node' && <NodePanel codes={codes}></NodePanel>}

      {ENState.overlay === 'addCodeBlock' && (
        <div
          style={{
            width: `100%`,
            position: 'absolute',
            top: `0px`,
            left: `0px`,
            backgroundColor: 'rgba(255,255,255,0.95)'
          }}
        >
          <div
            style={{ width: `100%`, backgroundColor: 'rgba(40,255,40,1.0)' }}
            className='bg-green-400'
          >
            <div
              style={{
                width: `100%`,
                padding: '15px',
                fontSize: '30px',
                fontFamily: 'Arial'
              }}
            >
              <div
                style={{
                  width: `100%`
                }}
              >
                Click on Floor to Add
              </div>
            </div>
          </div>
        </div>
      )}

      {ENState.overlay && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px'
          }}
        >
          <svg
            width='24'
            height='24'
            xmlns='http://www.w3.org/2000/svg'
            fillRule='evenodd'
            clipRule='evenodd'
            fill='white'
            onClick={() => {
              ENState.overlay = ''
            }}
            onPointerDown={() => {
              ENState.overlay = ''
            }}
            style={{
              cursor: 'pointer'
            }}
          >
            <path d='M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z' />
          </svg>
        </div>
      )}
    </div>
  ) : (
    <div></div>
  )
}

// title: path.basename(key),
// loader: () => r(key)
function MainPanel({ codes = [] }) {
  let nodesTemplates = codes
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: '0px',
        left: '0px',
        backgroundColor: 'rgba(255,255,255,0.92)'
      }}
    >
      {/*  */}
      <div
        style={{
          backgroundColor: 'rgba(255,255,0,0.92)'
        }}
      >
        <div
          style={{
            padding: '15px',
            fontSize: '30px',
            fontFamily: 'Arial'
          }}
        >
          <div>Getting Started</div>
        </div>
      </div>

      <div
        style={{
          padding: '15px',
          fontSize: '20px',
          fontFamily: 'Arial'
        }}
      >
        <div>Add New CodeBlock</div>
      </div>

      {nodesTemplates.map((e) => {
        return (
          <div
            key={e.title}
            style={{
              marginLeft: '15px',
              marginBottom: '15px',
              textDecoration: 'underline'
            }}
          >
            <div
              style={{ cursor: 'pointer' }}
              onPointerDown={() => {
                ENState.addNodeTitle = e.title
                ENState.hovering = 'floor'
                ENState.cursorMode = 'addCodeBlock'
                ENState.overlay = 'addCodeBlock'
              }}
            >
              {e.title}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// title: path.basename(key),
// loader: () => r(key)
function NodePanel({ codes = [] }) {
  let nodesTemplates = codes

  let { node, outputLinks, inputLinks } = useMemo(() => {
    let fireNodeID = ENState.currentEditNodeID
    let node = ENState.nodes.find((e) => e._fid === fireNodeID)
    let inputLinks = []
    let outputLinks = []

    if (node) {
      let nodeID = node.data._id

      inputLinks = ENState.connections.filter((conn) => {
        if (conn.data.input.nodeID === nodeID) {
          return true
        }
      })

      outputLinks = ENState.connections.filter((conn) => {
        if (conn.data.output.nodeID === nodeID) {
          return true
        }
      })
    }

    return {
      node,
      inputLinks,
      outputLinks
    }
  })

  let [, reload] = useState(0)
  let [title, setTitle] = useState(node.data.title)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: '0px',
        left: '0px',
        backgroundColor: 'rgba(255,255,255,0.92)'
      }}
    >
      <div
        style={{
          backgroundColor: 'lightblue'
        }}
      >
        <div
          style={{
            padding: '15px',
            fontSize: '30px',
            fontFamily: 'Arial'
          }}
        >
          <div>Node Settings</div>
        </div>
      </div>

      <div
        style={{
          padding: '15px',
          fontSize: '20px',
          fontFamily: 'Arial'
        }}
      >
        <div>
          Node using logic:{' '}
          <div
            style={{
              borderColor: 'black',
              display: 'inline-block',
              border: 'black solid 1px'
            }}
          >
            <select
              style={{ appearance: 'none', width: '100%', height: '100%' }}
              value={title}
              onChange={({ target: { value } }) => {
                node.data.title = value
                ENMethods.saveCodeBlock({ node })
                setTitle(value)
              }}
            >
              {nodesTemplates.map((t, i) => {
                return (
                  <option key={i + t.title} value={t.title}>
                    {t.title}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      </div>

      {inputLinks.length > 0 && (
        <div
          style={{
            padding: '15px',
            fontSize: '23px',
            fontFamily: 'Arial'
          }}
        >
          <div style={{ cursor: 'pointer' }}>Inputs</div>
        </div>
      )}

      {inputLinks.map((e) => {
        let localID = e.data.input._id
        let idx = node.data.inputs.findIndex((e) => e._id === localID)

        let socket = node.data.inputs.find((e) => e._id === localID)
        let remoteNode = ENState.nodes.find((e) => e.data._id === socket.nodeID)
        return (
          <div
            key={e._fid}
            style={{
              marginLeft: '15px',
              marginBottom: '15px',
              textDecoration: 'underline'
            }}
          >
            <div
              style={{ cursor: 'pointer' }}
              onPointerDown={(ev) => {
                if (ev.currentTarget.style.color === 'red') {
                  //
                  ENMethods.removeLinkByID({ linkID: e._fid })
                  reload((s) => s + 1)
                }
                ev.currentTarget.style.color = 'red'
              }}
            >
              {/*  */}
              Remove Input at label "{idx}"{' '}
              {remoteNode.data.title && (
                <span>which is conncted to "{remoteNode.data.title}"</span>
              )}
            </div>
          </div>
        )
      })}

      {outputLinks.length > 0 && (
        <div
          style={{
            padding: '15px',
            fontSize: '23px',
            fontFamily: 'Arial'
          }}
        >
          <div style={{ cursor: 'pointer' }}>Outputs</div>
        </div>
      )}

      {outputLinks.map((e) => {
        let localID = e.data.output._id
        let idx = node.data.outputs.findIndex((e) => e._id === localID)

        let socket = node.data.outputs.find((e) => e._id === localID)
        let remoteNode = ENState.nodes.find((e) => e.data._id === socket.nodeID)

        return (
          <div
            key={e._fid}
            style={{
              marginLeft: '15px',
              marginBottom: '15px',
              textDecoration: 'underline'
            }}
          >
            <div
              style={{ cursor: 'pointer' }}
              onPointerDown={(ev) => {
                if (ev.currentTarget.style.color === 'red') {
                  ENMethods.removeLinkByID({ linkID: e._fid })
                  reload((s) => s + 1)
                }
                ev.currentTarget.style.color = 'red'
              }}
            >
              {/*  */}
              Remove Output at label "{idx}"{' '}
              {remoteNode.data.title && (
                <span>which is conncted to "{remoteNode.data.title}"</span>
              )}
            </div>
          </div>
        )
      })}

      <div
        style={{
          padding: '15px',
          fontSize: '23px',
          fontFamily: 'Arial'
        }}
      >
        <div style={{ cursor: 'pointer' }}>Remove Node & Connections</div>
      </div>

      <div
        style={{
          padding: '15px',
          textDecoration: 'underline',
          fontFamily: 'Arial'
        }}
      >
        <div
          style={{ cursor: 'pointer' }}
          onPointerDown={() => {
            if (window.confirm(`remove item`)) {
              ENMethods.removeCurrentNodeAndConnections()
              ENState.overlay = ''
            }
          }}
        >
          Remove
        </div>
      </div>
    </div>
  )
}

//
