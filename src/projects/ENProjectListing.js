import React, { useEffect } from 'react'
import { ENState } from '../editor/ENState'
import { onReady } from '../editor/firebase'
import copy from 'copy-to-clipboard'
//
export function ENProjectListing({ firebaseConfig, onEdit = () => {} }) {
  //
  ENState.makeKeyReactive('listing')
  ENState.makeKeyReactive('listingReload')

  useEffect(() => {
    onReady({ firebaseConfig }).then(({ user, db }) => {
      //
      //
      let listingRef = db.ref(`profile/${user.uid}/canvas`)

      let load = () => {
        listingRef.once('value', (snap) => {
          let val = snap.val()
          if (val) {
            let arr = []
            for (let kn in val) {
              arr.push({
                _fid: kn,
                data: val[kn]
              })
            }
            //

            ENState.listing = arr
          }
        })
      }

      load()
      ENState.onChange('listingReload', () => {
        load()
      })
    })
  }, [ENState.listingReload])

  //
  return (
    <div style={{ overflowX: 'scroll', marginLeft: '12px' }}>
      <table>
        <thead>
          <tr>
            <th className='p-3 border  ' colSpan={1}>
              <span className='w-24 inline-block'></span>Title{' '}
              <span className='w-24 inline-block'></span>
            </th>
            <th className='p-3 border  ' colSpan={1}>
              <span className='w-3 inline-block'></span>CanvasID{' '}
              <span className='w-3 inline-block'></span>
            </th>
            <th className='p-3 border ' colSpan={3}>
              Actions
            </th>
            {/* <th>JSON</th> */}
          </tr>
        </thead>

        <tbody>
          {ENState.listing.map((e, idx) => {
            return (
              <tr key={e._fid}>
                <td
                  style={{ padding: '13px 5px' }}
                  className='p-3 m-3 border bg-white '
                >
                  {e.data.title}
                </td>
                <td
                  style={{ padding: '13px 5px' }}
                  className='p-3 m-3 border bg-white '
                >
                  <span
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      copy(e._fid)
                    }}
                  >
                    {e._fid}
                  </span>
                </td>
                <td style={{ padding: '13px 5px' }} className='p-3 border m-0'>
                  <button
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      //
                      copy(
                        `
/* graphTitle: ${e.data.title} */
/* graphID: ${e._fid} */
`.trim()
                      )
                    }}
                  >
                    Copy Code
                  </button>
                </td>
                <td style={{ padding: '13px 5px' }} className='p-3 border m-0'>
                  <button
                    style={{ cursor: 'pointer' }}
                    className=' p-3 px-6 rounded-full bg-yellow-500 text-white'
                    onClick={() => {
                      //
                      let title = e.data.title || 'no title'

                      onReady({ firebaseConfig }).then(({ user, db }) => {
                        let newTitle = window.prompt(
                          `Type "${title}" to Confirm Removal, theres no restore.`,
                          `${title}`
                        )

                        if (newTitle) {
                          newTitle = (newTitle || '').trim()

                          let listingRef = db.ref(
                            `profile/${user.uid}/canvas/${e._fid}/title`
                          )
                          listingRef.set(newTitle)

                          e.data.title = newTitle

                          ENState.listingReload++
                        }
                      })
                    }}
                  >
                    Rename
                  </button>
                </td>
                <td style={{ padding: '13px 5px' }} className='p-3 border m-0'>
                  <button
                    style={{ cursor: 'pointer' }}
                    className=' p-3 px-6 rounded-full bg-blue-500 text-white'
                    onClick={() => {
                      //
                      // router.push(
                      //   `/effectnode/editor/${e.data.ownerID}/${e._fid}`
                      // )
                      onEdit({
                        ownerID: e.data.ownerID,
                        canvasID: e._fid
                      })
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td style={{ padding: '13px 5px' }} className='p-3 border'>
                  <button
                    style={{ cursor: 'pointer' }}
                    className='  p-3 px-6 rounded-full bg-red-500 text-white'
                    onClick={() => {
                      //
                      //
                      onReady({ firebaseConfig }).then(({ user, db }) => {
                        let title = e.data.title || 'no title'
                        if (
                          (
                            window.prompt(
                              `Type "${title}" to Confirm Removal, theres no restore.`,
                              `${title} ______`
                            ) || ''
                          ).trim() === title
                        ) {
                          let listingRef = db.ref(
                            `profile/${user.uid}/canvas/${e._fid}`
                          )
                          listingRef.remove()

                          ENState.listing.splice(idx, 1)
                          ENState.listingReload++
                        }
                      })
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

//

//

//
