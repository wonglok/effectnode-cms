import React from 'react'
import { ENProjectAdd } from './ENProjectAdd'
import { ENProjectListing } from './ENProjectListing'
export function ProjectListing({ firebaseConfig, onEdit = () => {} }) {
  return (
    <div style={{ width: `100%`, backgroundColor: 'white' }}>
      <div
        style={{
          width: '100%',
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
              fontSize: '35px',
              fontFamily: 'Arial'
            }}
          >
            <div>Project Listing</div>
          </div>
        </div>

        <ENProjectAdd firebaseConfig={firebaseConfig}></ENProjectAdd>
        <ENProjectListing
          firebaseConfig={firebaseConfig}
          onEdit={onEdit}
        ></ENProjectListing>
      </div>
    </div>
  )
}
