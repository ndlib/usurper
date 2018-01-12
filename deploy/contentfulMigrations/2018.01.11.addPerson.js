const forward = (migration) => {

  // PERSON type
  const person = migration.createContentType('person')
    .name('Person')
    .displayField('name')

  person.createField('name')
    .type('Symbol')
    .name('Name')

  person.createField('title')
    .type('Symbol')
    .name('Title')

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

  person.createField('type')
    .type('Symbol')
    .name('Type')
    .validations([
      { in: ['Instructor','Presenter','Speaker','Keynote','Facilitator',
             'Moderator','Convener','Panelist','Discussant']
      }
    ])


  // EVENT field update
  const eventType = migration.editContentType('event')
    .createField('presenters')
    .name('Presenter(s)')
    .type('Array')
    .items({
      type: 'Link',
      validations: [{
        linkContentType: ['person'],
      }],
      linkType: 'Entry',
    })
}

const reverse = (migration) => {
  migration.deleteContentType('person')
  migration.editContentType('event').deleteField('presenters')
}

module.exports = forward
