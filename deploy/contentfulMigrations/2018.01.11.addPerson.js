const forward = (migration) => {

  // PERSON type
  const person = migration.createContentType('person')
    .name('Person')
    .displayField('name')

  person.createField('name')
    .type('Symbol')
    .name('Name')

  person.createField('bio')
    .type('Text')
    .name('Bio')

  person.createField('email')
    .type('Symbol')
    .name('Email')

  person.createField('phone')
    .type('Symbol')
    .name('Phone')

  person.createField('picture')
    .type('Link')
    .name('Picture')
    .linkType('Asset')

  // PRESENTER type
  const presenter = migration.createContentType('presenter')
    .name('Presenter')

  presenter.createField('title')
    .name('Title')
    .type('Symbol')
  
  presenter.createField('type')
    .type('Symbol')
    .name('Type')
    .validations([
      { in: ['Instructor','Presenter','Speaker','Keynote','Facilitator',
              'Moderator','Convener','Panelist','Discussant']
      }
    ])

  presenter.createField('people')
    .name('People')
    .type('Array')
    .items({
      type: 'Link',
      validations: [{
        linkContentType: ['person'],
      }],
      linkType: 'Entry',
    })

  // EVENT field update
  const eventType = migration.editContentType('event')
    .createField('presenters')
    .name('Presenter(s)')
    .type('Array')
    .items({
      type: 'Link',
      validations: [{
        linkContentType: ['presenter'],
      }],
      linkType: 'Entry',
    })
}

const reverse = (migration) => {
  migration.editContentType('event').deleteField('presenters')
  migration.deleteContentType('presenter')
  migration.deleteContentType('person')
}

module.exports = forward
