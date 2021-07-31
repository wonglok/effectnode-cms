import React from 'react'
import { LoginChecker } from '../auth/LoginChecker'
import { ProjectListing } from '../projects/ProjectListing'

export const ProjectListingPage = ({ firebaseConfig }) => {
  return (
    <LoginChecker firebaseConfig={firebaseConfig}>
      <ProjectListing
        firebaseConfig={firebaseConfig}
        onEdit={(ev) => {
          console.log(ev)
        }}
      ></ProjectListing>
    </LoginChecker>
  )
}
