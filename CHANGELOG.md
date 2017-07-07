# Change Log

## [0.7](https://github.com/ndlib/usurper/tree/master) (In development)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.6.0...master)

### New features/enhancements:

### Bug fixes:

## [0.6](https://github.com/ndlib/usurper/tree/master) (2017-08-06)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.5.0...v0.6.0)

### New features/enhancements:
- Updated the layout of how service point location information is displayed [#169](https://github.com/ndlib/usurper/pull/169)
- Content admins can now set a search preference for a page. [#170](https://github.com/ndlib/usurper/pull/170)
- Added aria-hidden to the images when alt='' for screen readers. [#174](https://github.com/ndlib/usurper/pull/174)
- Added a service to rewrite old website urls [#174](https://github.com/ndlib/usurper/pull/174)

### Bug fixes:
- Fixed off site links to Libguides in pathfinders [#173] (https://github.com/ndlib/usurper/pull/173)
- Added a better page title to 404 and 500 pages for screen readers. [#174](https://github.com/ndlib/usurper/pull/174)
- Fixed a problem with rendering a published page that contained related pages that were unpublished [#176](https://github.com/ndlib/usurper/pull/176)
- Fixed the location of the subject librarians 
- Fixed various mobile and website related css [#178](https://github.com/ndlib/usurper/pull/178)
- Several PRs related to home page accessability.  [#174](https://github.com/ndlib/usurper/pull/174) [#177](https://github.com/ndlib/usurper/pull/177)
- Search menu readded to mobile [#178](https://github.com/ndlib/usurper/pull/178)

## [0.5](https://github.com/ndlib/usurper/tree/v0.5.0) (2017-07-06)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.4.0...v0.5.0)

### New features/enhancements:
- When users tab through the menu pressing enter on the 'My Account' menu item takes the user to the 'personal page.' The user could switch between courses and personal page via links on the page when tabbing through the interface, but had no opportunity to log out. A log out button was added to both pages.
[#165](https://github.com/ndlib/usurper/pull/165)
- Updated the layout of how service point location information is displayed [#164](https://github.com/ndlib/usurper/pull/164)
- Hours will now expand/collapse when clicking anywhere on the row, not just the arrow [#166](https://github.com/ndlib/usurper/pull/166)
- Updated the search to point at the GSS and fixed the site information [#160](https://github.com/ndlib/usurper/pull/160)
- Added a logout button to the courses and items and requests page.  [#165](https://github.com/ndlib/usurper/pull/165)

### Bug fixes:
- fix an issue with incorrect links on secure pages [#163](https://github.com/ndlib/usurper/pull/163)
- allow back button to work correctly with secure pages [#163](https://github.com/ndlib/usurper/pull/163)
- fix issue with hours causing pages not to load [#163](https://github.com/ndlib/usurper/pull/163)
- fix a couple small js errors [#163](https://github.com/ndlib/usurper/pull/163)
- fixed a wide variety of small visual errors.


## [0.4](https://github.com/ndlib/usurper/tree/v0.4.0)  (2017-06-30)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.3.0...v0.4.0)

### New features/enhancements:
- Events now use actual data from Contentful [#134](https://github.com/ndlib/usurper/pull/134)
- Updated the UI to have a better tags and title for screen readers. [#149](https://github.com/ndlib/usurper/pull/149), [#155](https://github.com/ndlib/usurper/pull/155)
- Improving accessibility considerations for Search [#151](https://github.com/ndlib/usurper/pull/151), [#156](https://github.com/ndlib/usurper/pull/156)

### Bug fixes:
- Fixed an issue with the search panel rendering behind the news components [#135](https://github.com/ndlib/usurper/pull/135)
- Fixes a bug where the course tabular heading was not connected to the data in a couple instances. [#136](https://github.com/ndlib/usurper/pull/136)
- Fix tab order and behavior for navigation menu and chat button. [#137](https://github.com/ndlib/usurper/pull/137)
- Fix bug related to stored search [#137](https://github.com/ndlib/usurper/pull/137)
- Fixed several issues related to the site responding to tab and enter key presses [#137](https://github.com/ndlib/usurper/pull/137)
- Fixed a bug that prevented the searchbox from dropping down [#137](https://github.com/ndlib/usurper/pull/137)
- Updated CurateND dropdown description [#138](https://github.com/ndlib/usurper/pull/138)
- Fixed database list link titles for accessibility [#138](https://github.com/ndlib/usurper/pull/138)
- Some style changes to the services landing page [#139](https://github.com/ndlib/usurper/pull/139)
- Add mobile icons [#140](https://github.com/ndlib/usurper/pull/140)
- Fixed an issue with the search panel incorrectly turning off for several pages [#140](https://github.com/ndlib/usurper/pull/140)
- Updated data management links [#140](https://github.com/ndlib/usurper/pull/140)
- Logout button always redirects back to home page [#141](https://github.com/ndlib/usurper/pull/141)
- Fixed a screen reader issue with expanded hours [#141](https://github.com/ndlib/usurper/pull/141)
- Fixed an issue with the room-reservations link [#141](https://github.com/ndlib/usurper/pull/141)
- Screen readers will now ignore the chat image, and several other tags [#143](https://github.com/ndlib/usurper/pull/143), [#143](https://github.com/ndlib/usurper/pull/143)
- Service points in hours components will now be rendered in red when closed [#147](https://github.com/ndlib/usurper/pull/147)
- Fixed an issue with contact people showing on incorrect pages [#144](https://github.com/ndlib/usurper/pull/144)
- Non-published images no longer cause infinite loading on referencing pages [#150](https://github.com/ndlib/usurper/pull/150)
- Fixed the sorting of hours [#153](https://github.com/ndlib/usurper/pull/153)
- Mimic native dropdown select/option behavior with the search type selection.
 * Down arrow opens dropdown.
 * Up and Down arrow is used to navigate options. Tab is disabled.
 * Enter selects option and retains focus on top level component instead of advancing to next tabIndex as happens in click selection.
- Add search button in navigation to tabIndex order and toggle on enterbeing pressed
[#152](https://github.com/ndlib/usurper/pull/152)
- Use the existing search.nd.edu instead of the newer /search?q=
[#157](https://github.com/ndlib/usurper/pull/157)
- Users can now use the keyboard to expand/collapse hours [#154](https://github.com/ndlib/usurper/pull/154)

## [0.3](https://github.com/ndlib/usurper/tree/v0.3.0) (2017-06-28)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.2.0...v0.3.0)

### New features/enhancements:
- Added Database Landing Pages [#132](https://github.com/ndlib/usurper/pull/132)
- Added Pathfinder Pages for individual Courses[#129](https://github.com/ndlib/usurper/pull/129)
- Added News from Contenful in the home page [#125](https://github.com/ndlib/usurper/pull/125)
- Added Advanced Search to the search box [#130](https://github.com/ndlib/usurper/pull/130)

### Bug fixes:
- Various Links in the menus.
- Fixed an issue where the login menu item was not paying attention to if you were actually logged in or not
- Fixed missing titles on the courses pages
- Fixed missing tabular data headings on the courses pages.
- Fixed some rendering issues on the hours page.
- Hours and account were readling ltr in the tab order, but were visually rtl. Switched order and removed floats to get visual and tab order the same.
- Go to account page on 'enter' keyDown on 'My Account' button when tabbing through UI.



## [0.2](https://github.com/ndlib/usurper/tree/v0.2.0) (2017-06-28)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.1.0...v0.2.0)

### New features/enhancements:
- Added advanced search [#121](https://github.com/ndlib/usurper/issues/121)
- Hours page will now render service point contact information and allow the user to expand each for more hours info [#122](https://github.com/ndlib/usurper/issues/122), [#123](https://github.com/ndlib/usurper/issues/123), [#127](https://github.com/ndlib/usurper/issues/127)
- Replaced placeholder news with news read from contentful and added individual news pages [#125](https://github.com/ndlib/usurper/issues/125)
- Added Hours & My Account to the mobile menu [#124](https://github.com/ndlib/usurper/issues/124)
- Added Find Your Librarian image and link on the home page [#124](https://github.com/ndlib/usurper/issues/124)
- Other minor cosmetic changes [#124](https://github.com/ndlib/usurper/issues/124)

### Bug fixes:
- Hours label was not displaying saturdays in dev
- Fix issue where clicking on setting default search did not work on
iOS. [#126](https://github.com/ndlib/usurper/issues/126)
- Add cursor: pointer to a few places that should have it. [#126](https://github.com/ndlib/usurper/issues/126)
- Fixed a problem with the "My Account" button. Was not allowing the user to login if they were not logged in. [#128](https://github.com/ndlib/usurper/issues/128)

## [0.1](https://github.com/ndlib/usurper/tree/v0.1.0) (2017-06-27)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.0.0...v0.1.0)

### New features/enhancements:


### Bug fixes:



## [0.0](https://github.com/ndlib/usurper/tree/v0.0.0) (2017-06-26)
[Full Changelog](https://github.com/ndlib/usurper/compare/ecc77f4fe48fb2de13cc797831ea04c60664441f...v0.0.0)

### New features/enhancements:


### Bug fixes: ###
