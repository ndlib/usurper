# Change Log
## [0.13](https://github.com/ndlib/usurper/tree/v0.13.0) (2017-08-10)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.12.1...v0.13.0)

### New features/enhancements:
- Extra information is now given to Google Tag Manager for easier analytics gathering [#231](https://github.com/ndlib/usurper/pull/231)
- The contact us page is now driven by data from Contentful Service Points [#238](https://github.com/ndlib/usurper/pull/238)
- The deployed version of the front end can now be retrieved from a meta tag named 'nd-version' [#239](https://github.com/ndlib/usurper/pull/239)
- Added redirects for the following: [#241](https://github.com/ndlib/usurper/pull/241), [#243](https://github.com/ndlib/usurper/pull/243), [#244](https://github.com/ndlib/usurper/pull/244), [#252](https://github.com/ndlib/usurper/pull/252), [#255](https://github.com/ndlib/usurper/pull/255)
  - /instruction/potofgold -> https://potofgold.library.nd.edu
  - /clavius -> http://clavius.library.nd.edu
  - /rigorandrelevance -> http://rigorandrelevance.library.nd.edu
  - /GLSBC2016 -> http://glsbc2016.library.nd.edu
  - /utilities/acquisitions/order -> https://factotum.library.nd.edu/utilities/forms/purchase/new
  - /directory/* -> https://directory.library.nd.edu/directory/*
  - /utilities/* -> https://factotum.library.nd.edu/utilities/*
  - /cds/* -> http://cds.library.nd.edu/*
  - /guide-on-the-side/* -> https://guide-on-the-side.library.nd.edu/*
  - /documents/* -> https://documents.library.nd.edu/documents/*
  - /eresources/* -> https://eresources.library.nd.edu/*
- Add News and Events landing pages (/news and /events) [#253](https://github.com/ndlib/usurper/pull/253)
- Added copyright link and rearranged the contact page [#254](https://github.com/ndlib/usurper/pull/254)
- Updated version of React (will require a yarn install) [#251](https://github.com/ndlib/usurper/pull/251)
- Removed more info links from the hours page [#250](https://github.com/ndlib/usurper/pull/250)
- Navigation and landing pages are now driven by data from Contentful [#229](https://github.com/ndlib/usurper/pull/229) (Note: This depends on the merge and deploy of [usurper_content#41](https://github.com/ndlib/usurper_content/pull/41))

### Bug fixes:
- Fixed the search arrow display on IE-11 [#240](https://github.com/ndlib/usurper/pull/240)
- Fixed the catalog link to point to factotum [#242](https://github.com/ndlib/usurper/pull/242)
- Fixed the cover images on event pages [#249](https://github.com/ndlib/usurper/pull/249)
- Fixed mobile display on the home page [#248](https://github.com/ndlib/usurper/pull/248)
- Fixed a problem with the search query builder [#247](https://github.com/ndlib/usurper/pull/247)
- Fixed several issues with accessibility on Chrome [#246](https://github.com/ndlib/usurper/pull/246)

## [0.12.1](https://github.com/ndlib/usurper/tree/v0.12.1) (2017-08-07)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.12.0...v0.12.1)

### New features/enhancements:

### Bug fixes:
- Fixed an issue with redirects to deep links in factotum [#244](https://github.com/ndlib/usurper/pull/244)

## [0.12](https://github.com/ndlib/usurper/tree/v0.12.0) (2017-8-2)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.11.0...v0.12.0)

### New features/enhancements:
- Added more info to hours page [#228](https://github.com/ndlib/usurper/pull/228)
- Added pot of gold redirects [#232](https://github.com/ndlib/usurper/pull/232)
- Added rare books to the hours page [#235](https://github.com/ndlib/usurper/pull/235)

### Bug fixes:
- Fixed a bug that caused service points on hours pages to appear closed after 8pm [#234](https://github.com/ndlib/usurper/pull/234)
- Fixed the & issue in research menu and other display fixes [#227](https://github.com/ndlib/usurper/pull/227), [#230](https://github.com/ndlib/usurper/pull/230), [#237](https://github.com/ndlib/usurper/pull/237)
- Fixed problems with service now links [#236](https://github.com/ndlib/usurper/pull/236)

## [0.11](https://github.com/ndlib/usurper/tree/v0.11.0) (2017-7-27)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.10.0...v0.11.0)

### New features/enhancements:

### Bug fixes:
- Add Math library to hours page [#225](https://github.com/ndlib/usurper/pull/225)
- Fix Safari hours coloring [#225](https://github.com/ndlib/usurper/pull/225)
- Fixed missing Monday data and "Today: undefined" bugs on the hours page. Note: This does require data changes in libcal before it will be fully fixed. [#224](https://github.com/ndlib/usurper/pull/224)
- Fixed a javascript warning related to passing an array into the InlineHours component [#224](https://github.com/ndlib/usurper/pull/224)
- Fixed dom ids on the hours page to be unique and not contain spaces [#224](https://github.com/ndlib/usurper/pull/224)
- Removed CDS Scholarship Rooms and added University Archives to hours page [#224](https://github.com/ndlib/usurper/pull/224)
- Fixed major display issues on older firefox versions [#226](https://github.com/ndlib/usurper/pull/226)


## [0.10](https://github.com/ndlib/usurper/tree/v0.10.0) (2017-7-26)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.9.0...v0.10.0)

### New features/enhancements:

### Bug fixes:
- Images now handle errors and render null instead of broken link [#212](https://github.com/ndlib/usurper/pull/212)
- Button on my items page will now link no matter where you click [#212](https://github.com/ndlib/usurper/pull/212)
- Hide search bar image on homepage when closed [#218](https://github.com/ndlib/usurper/pull/218)
- Search preferences should work correctly again [#214](https://github.com/ndlib/usurper/pull/214)
- Hotjar should work again
- Handle image errors and render null instead of broken link [#212](https://github.com/ndlib/usurper/pull/212)


## [0.9](https://github.com/ndlib/usurper/tree/v0.9.0) (2017-7-24)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.8.0...v0.9.0)

### New features/enhancements:
- Update the hours page to have a specified list and order with a way to indicate that some lists are sub-listings.  Current CSS is to indent [#208](https://github.com/ndlib/usurper/pull/208)
- Updated a number of routes in the nav to point to new slugs [#209](https://github.com/ndlib/usurper/pull/209)
- Removed course guides from courses until we can work with libguides [#207](https://github.com/ndlib/usurper/pull/207)

### Bug fixes:
- Display fixes for mobile [#210](https://github.com/ndlib/usurper/pull/210)

## [0.8](https://github.com/ndlib/usurper/tree/v0.8.0) (2017-7-21)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.7.2...v0.8.0)

### New features/enhancements:
- Added Alerts to both Page and Global scopes [#200](https://github.com/ndlib/usurper/pull/200)
- Added Sidebar to Hours Page [#199](https://github.com/ndlib/usurper/pull/199)
- Update the floor maps to display the call number range on the floor.[#201](https://github.com/ndlib/usurper/pull/201)
- Update the display of the hours component on pathfinders to have a title outside the hours component [#206](https://github.com/ndlib/usurper/pull/206)
- Contact Service point part of pathfinder can now have extra text describing how to get access to the service point [#206](https://github.com/ndlib/usurper/pull/206)
- Contact Service point part of pathfinder can now have an email to the service point [#206](https://github.com/ndlib/usurper/pull/206)
- Update the hours page to have a class name on the components so libraries can be distinct from service points [#206](https://github.com/ndlib/usurper/pull/206)
- Updated pathfinder sidenav to list individual sections as complementary to the screen reader rather than a [#206](https://github.com/ndlib/usurper/pull/206)
- Updated usurper to have redirects for many of the top 50 entry points that need a redirect [#203](https://github.com/ndlib/usurper/pull/203)
- A wide varitey of content and css changes

### Bug fixes:
- All Internal links are now rewritten to be truely internal [#199](https://github.com/ndlib/usurper/pull/199)
- Fixed bug with SetIntraval not getting unmounted when the hours are displayed.[#205](https://github.com/ndlib/usurper/pull/205)
- Fixed bug with preventing an svg image in the footer from being displayed [#204](https://github.com/ndlib/usurper/pull/204)

## [0.7](https://github.com/ndlib/usurper/tree//v0.7.2) (2017-14-07)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.6.0...v0.7.2)

### New features/enhancements:
- Added the page html title to the PageTitle component [#182](https://github.com/ndlib/usurper/pull/182)
- Added Static Sidebar/Body components to dynamic pages [#188](https://github.com/ndlib/usurper/pull/188)
- The Chat button on small screens now opens the chat page instead of an unhelpful popup [#181](https://github.com/ndlib/usurper/pull/181)
- Hours will now change color depending on if they're currently open or not [#193](https://github.com/ndlib/usurper/pull/193)


### Bug fixes:
- Add aria-controls to hours components [#190](https://github.com/ndlib/usurper/pull/190)
- Fix "top" anchors on all pages [#190](https://github.com/ndlib/usurper/pull/190)
- Hours cards colors now update according to open/closed state [#193](https://github.com/ndlib/usurper/pull/193)
- Make sure all invalid urls show the 404 page [#187](https://github.com/ndlib/usurper/pull/187)
- Subjects page is now sorted alphabetically [#184](https://github.com/ndlib/usurper/pull/184)
- Fix "Delievered to web" button for illiad web deliveries

## [0.6](https://github.com/ndlib/usurper/tree/v0.6.0) (2017-08-06)
[Full Changelog](https://github.com/ndlib/usurper/compare/v0.5.0...v0.6.0)

### New features/enhancements:
- Updated the layout of how service point location information is displayed [#169](https://github.com/ndlib/usurper/pull/169)
- Content admins can now set a search preference for a page. [#170](https://github.com/ndlib/usurper/pull/170)
- Added aria-hidden to the images when alt='' for screen readers. [#174](https://github.com/ndlib/usurper/pull/174)
- Added a service to rewrite old website urls [#174](https://github.com/ndlib/usurper/pull/174)

### Bug fixes:
- Fixed issues with the news and events in screen readers. [#177](https://github.com/ndlib/usurper/pull/177)
- Fixed links to be able to have an aria-label [#177](https://github.com/ndlib/usurper/pull/177)
- Fixed off site links to Libguides in pathfinders [#173](https://github.com/ndlib/usurper/pull/173)
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
