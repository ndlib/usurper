// Container component for a Page content type from Contentful
import React from 'react'
import Link from '../Link'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'

const SubjectList = () => {
  const links = [
    { name: 'Aerospace & Mechanical Engineering',    url: '/aerospace-and-mechanical-engineering' },
    { name: 'Architecture',                          url: '/architecture' },
    { name: 'Africana Studies',                      url: '/africana-studies' },
    { name: 'American Studies',                      url: '/american-studies' },
    { name: 'Anthropology',                          url: '/anthropology' },
    { name: 'Art, Art History, & Design',            url: '/art-art-history-design' },
    { name: 'Biology, Environmental Sciences, & Medicine', url: '/biology' },
    { name: 'Business',                              url: '/business' },
    { name: 'Byzantine Studies',                     url: '/byzantine-studies' },
    { name: 'Catholic Studies',                      url: '/catholic-studies' },
    { name: 'Chemical Engineering',                  url: '/chemical-engineering' },
    { name: 'Chemistry & Biochemistry',              url: '/chemistry' },
    { name: 'Civil & Environmental Engineering',     url: '/civil-and-environmental-engineering' },
    { name: 'Classics',                              url: '/classics' },
    { name: 'Computer Science & Engineering',        url: '/computer-science-and-engineering' },
    { name: 'Earth Science',                         url: '/earth-science' },
    { name: 'East Asian Studies', url: '/east-asian-studies' },
    { name: 'Economics',                             url: '/economics' },
    { name: 'Education',                             url: '/education' },
    { name: 'Electrical Engineering',                url: '/electrical-engineering' },
    { name: 'Engineering',                           url: '/engineering' },
    { name: 'English Language & Literature',         url: '/english' },
    { name: 'Film, Television, & Theatre',           url: '/film-television-theatre' },
    { name: 'French Language, Literature, & Culture',url: '/french' },
    { name: 'Gender Studies',                        url: '/gender-studies' },
    { name: 'German Language, Literature, & Culture',url: '/german' },
    { name: 'Global Affairs',                        url: '/global-affairs' },
    { name: 'History',                               url: '/history' },
    { name: 'History and Philosophy of Science',     url: '/history-and-philosophy-of-science' },
    { name: 'Irish Studies',                         url: '/irish-studies' },
    { name: 'Italian Language, Literature, & Culture', url: '/italian' },
    { name: 'Latin American, Iberian, and Latino Studies', url: '/spanish' },
    { name: 'Mathematics and Applied Mathematics',   url: '/mathematics' },
    { name: 'Medieval Studies',                      url: '/medieval' },
    { name: 'Music',                                 url: '/music' },
    { name: 'Peace Studies',                         url: '/peace-studies' },
    { name: 'Philosophy',                            url: '/philosophy' },
    { name: 'Physics',                               url: '/physics' },
    { name: 'Political Science',                     url: '/political-science' },
    { name: 'Psychology',                            url: '/psychology' },
    { name: 'Russian and East European Languages, Literatures, & Cultures', url: '/russian' },
    { name: 'Sociology',                             url: '/sociology' },
    { name: 'Statistics & Probability',              url: '/mathematics' },
    { name: 'Theology and Religion',                 url: '/theology-religion' },
  ]

  // alphabetical sort
  links.sort((a, b) => {
    let left = a.name
    let right = b.name
    if (left < right) {
      return -1
    } else if (right < left) {
      return 1
    }
    return 0
  })

  return (
    <div className='container-fluid content-area'>
      <SearchProgramaticSet open={false} />
      <PageTitle title='Subjects' />
      <div className='row'>
        <div className='col-md-6'>
          {
            links.slice(0, links.length / 2).map((entry) => {
              return <p key={entry.name}><Link to={entry.url}>{entry.name}</Link></p>
            })
          }
        </div>
        <div className='col-md-6'>
          {
            links.slice(links.length / 2).map((entry) => {
              return <p key={entry.name}><Link to={entry.url}>{entry.name}</Link></p>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SubjectList
