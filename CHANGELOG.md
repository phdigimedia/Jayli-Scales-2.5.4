# Change Log

### [2.5.4] - 2021-05-10
### Changed
- Control if people can see your quantity selector in the theme settings now

### Fixed
- Vaulted credit cards play well with all payment providers now
  (fixes THEME-2073)

### [2.5.3] - 2021-02-23
### Fixed
- Updating the quantity number in the cart now updates the totals
- Make it easier to click on quantity update buttons in cart/product page

### [2.5.2] - 2021-01-28
### Changed
- Store data updated

### [2.5.1] - 2020-12-10
### Added
- Relevance is a helpful filter on search pages, so now it exists

### Changed
- Update to essential packages to make sure your theme is the best it can be

### [2.5.0] - 2020-10-22
### Added
- You can now make a note that persists across your site with the new region we
  added to the themes header

### [2.4.2] - 2020-09-24
### Fixed
- Menu's are only helpful when they open, so we made sure it's easy to open
- Group discounts aren't sales, so we aren't marking them as one any more
  (fixes THEME-1814)

### [2.4.1] - 2020-08-26
### Changed
- Product options are now parsed differently in the account pages to match up
  with changes made on the backend
- jQuery wanted to be relevant so we updated it
- Conditionally load polyfills based on browser need

### [2.4.0] - 2020-05-08
### Added
- There's a new region below the price on the product page now

### Changed
- A change on the backend means we needed to make a change to the frontend

### [2.3.0] - 2020-03-27
### Added
- Regions are now on content pages too

### [2.2.1] - 2020-03-05
### Fixed
- Sales badges were missing from the homepage product items, we found them and
  put them where they belong
- All errors from product review structured data have been corrected and as many
  warnings as we could were removed
- Being out of style is no good, so we updated the styles for the two column
  product page layout and the images show again

### [2.2.0] - 2020-02-27
### Changed
- We now use core-js v3 for our build system

### Added
- Google Enhance Ecommerce Analytics data tags are now supported

### [2.1.0] - 2020-02-07
### Changed
- Most images load using srcset now so shoppers get the images that are the
  right size for their screen

### Added
- Lazy load options have been added so you can control how your images show
  while they load

### [2.0.2] - 2019-11-01
### Fixed
- The gift certificate preview only shows when it's supposed to now
  (fixes THEME-1762)

### [2.0.1] - 2019-10-03
### Fixed
- For some reason we weren't letting people interact with our product images or
  videos on mobile, we removed the restriction and now you can view videos and
  use the image zoom on any device (fixes THEME-1844)
- Banner images were squashed which didn't look good, we fluffed 'em up and they
  should display just fine now
- The cart edit options panel ignored product inventory display settings which
  isn't very useful, but we fixed it so everything shows like it should
- AMP doesn't like JS so we removed some offending code that was causing it to
  error and made product descriptions show up better in the Schema in the
  process (fixes THEME-1767)

### [2.0.0] - 2019-09-12
### Added
- Regions will be all the rage when widgets are made available so we added them
  to the theme in preparation

### Changed
- We upgrade to Webpack 4, it's a backend thing so you don't have to think about
  it (fixes THEME-1850)

### [1.5.6] - 2019-08-28
### Changed
- Our support documentation link was out-of-date so we updated it and now you
  can find what you're looking for

### [1.5.5] - 2019-08-01
### Fixed
- Facets that were closed by default wouldn't open making them useless. We made
  sure they open now and also cleaned up the price range filter a little, happy
  search refining (fixes THEME-1785)

### Changed
- Jquery updated to maintain security

### [1.5.4] - 2019-06-06
### Fixed
- Pick list items were invisible on the cart page when shoppers wanted to change
  them and that wasn't very helpful at all. We made them visible again so people
  can easily change their mind (THEME-1778)
- Uploaded files will now display correctly on the cart page
- Reviews without star ratings are like bagels without cream cheese, not that
  good, so we made sure all reviews will have stars no matter what now
  (THEME-1781)

### [1.5.3] - 2019-04-11
### Fixed
- The structured data for breadcrumbs on the AMP pages was breaking them so we
  removed it

### [1.5.2] - 2019-03-28
### Fixed
- The return request form was really blank, so we filled the gaps back in
  (fixes THEME-1739)

### [1.5.1] - 2019-03-07
### Added
- We support CSRF protection now
- What to use the basic parts of Google Enhanced Ecomm Analytics? Now you can
- The ability to add to and create wishlists from the product page (THEME-898)

### Fixed
- Product images were showing up a little blurry so we bumped there size so it
  should work out
- Customers can now re-order from orders with OOS options (THEME-1519)

### Changed
- Update to stencil untils for CSRF protection

### [1.5.0] - 2019-02-07
### Changed
- Implemented new pricing structure, sale badges are now controlled by
  sale price and not the existence of a retail price. (THEME-1541)
- Changed "As low as" wording to price ranges for product options. It's more
  descriptive and works regardless of the default.

### Fixed
- Don't show a default price on quick-shop if there isn't one.

### Added
- Price label settings
- If your payment gateway allows credit card vaulting it is now supported on
  Scales, happy holiday earning
- The ability to update options in the cart (fixes THEME-942)

### [1.4.12] - 2019-01-24
### Fixed
- If you want shoppers to see product ratings on the product listing pages, now
  your theme supports it (fixes THEME-1705)
### [1.4.11] - 2018-10-18
### Added
- Support for smart Paypal buttons

### Fixed
- Images added in through the WYSIWYG editor on the webpages are no longer
  stretched out and weird on mobile (fixes THEME-1679)

### [1.4.10] - 2018-10-04
### Fixed
- Showing your shoppers the stock you have for your products can create a need
  to buy in them, so now the stock levels are visible on the product page
- Category descriptions now show lists like lists so it all makes sense

### [1.4.9] - 2018-09-13
### Fixed
- We are embarrassed to admit that there was a typo on the cart page, but there
  was and now it's fixed
- There was strange spacing on the homepage on mobile sometimes, but we
  straightened it out and it's alright now (fixes THEME-1640)

### [1.4.8] - 2018-08-09
### Fixed
- Scales now obeys the the multiple shipping address setting in the control
  panel
- If your inventory options were set to anything other then "Don't do anything"
  products were not successfully being added to the cart. Now it all works all
  the time (fixes THEME-1648)

### [1.4.7] - 2018-07-19
### Fixed
- The discount upsell banners were missing on the home and product page, now
  they are (fixes THEME-1425)
- Reviews help sell products and when you ask for them from your shoppers it
  should be easy for shoppers to leave them, so now when they click on the
  leave a review link in their email they will be taken to the review for on
  the product page, no extra clicking required
- Removed copyright year from footer of AMP pages

### Changed
- Fixed table styling and added thumbnails to the returns page

### [1.4.6] - 2018-07-12
### Fixed
- Removing items form the mini-cart wasn't as smooth as we would like, so we
  re-worked it a little bit to be much smoother

### [1.4.5] - 2018-06-28
### Added
- BC added support for a newsletter summary where you can tell your shoppers
  what you are up to with your newsletter and their consent to sign up. Scales
  now supports displaying that summary

### Fixed
- There was a weird display issue happening when shoppers zoomed their browser
  that made it so the navigation was hidden, we fixed it up so it should be
  visible all the time now (fixes THEME-1613)
- It was hard to see the remove icon on the cart preview, so we switched it out
  to match the remove link from the cart page which also makes it easier to
  remove products all together (fixes THEME-1407 & THEME-1408)
- File uploads were blocking shoppers from adding their products to the carts on
  iOS devices, we fixed that up so no one will be confused when their products
  wont add (fixes THEME-1605)

### [1.4.4] - 2018-06-07
### Changed
- We updated the package dependencies with their new github links, but nothing
  should look different

### [1.4.3] - 2018-05-10
### Added
- Scales is now playing ball with AMP on product pages, batter up!

### Fixed
- The captcha on the product review form was stuck in the past, we brought it to
  the now so it uses v2.0 now (fixes THEME-1591)

### [1.4.2] - 2018-04-26
### Fixed
- A script in the footer was causing drama in the AMP world, it has been removed
  now so your theme can be drama free

### [1.4.1] - 2018-04-05
### Added
- Header and footer scripts added to checkout and order confirmation pages

### [1.4.0] - 2018-03-22
### Added
- We AMPed up scales to support Google AMP Category pages for use with mobile
  Google searches

### [1.3.0] - 2018-03-01
### Added
- Add your geotrust seal through theme settings now

### [1.2.1] - 2018-02-19
### Fixed
- Fixed issue with Javascript not running on certain pages

### [1.2.0] - 2018-02-15

### Added
- Added an option to hide additional information on the product page

### Changed
- It was time to update webpack to version 3 so we can keep things running smoothly

### Fixed
- Color swatches were running wild and free on IE, we wrangled them back into
  their coral so users can see them
- Prevent long variant titles from being wider than select box

### [1.1.10] - 2018-01-18

### Fixed
- Fixed an issue where related product's prices would be match the current product's price when a variant was changed
- Fixed the way we show dropdown product options, you're welcome Safari!
- Hide product reviews section if reviews are turned off in the admin settings (fixes THEME-1427)

### [1.1.9] - 2018-01-04

### Added
- Added payment icons to the footer

### Changed
- Force IE to render in non-compatibility mode

### [1.1.8] - 2017-12-21

### Fixed
- Prevent email link from opening a new page (fixes THEME-1426)

### Added
- Optimized for Pixelpop added to the feature list

### [1.1.7] - 2017-11-30

### Added
- Added instructions to select dropdowns

### Changed
- Update to stencil-utils for better product option support
- Product checkbox customizations now appear like product option checkboxes

### Fixed
- Countries without states having no longer require the state field to be filled

### Changed
- Update to stencil-utils for better product option support

### [1.1.6] - 2017-11-22

### Changed
- Our themes now support all sorts of 3rd party giftcards! Let the celebrations begin!!!

### Fixed
- Fixed issue with the navigation not being cliackable in landscape mode on mobile

### [1.1.5] - 2017-11-02

### Added
- Users ask for a password reset? Well now they will get a notification when they
  do, everyone will feel better knowing they may get a reset link if they have
  an account associated with their email address.
- Now users can change their mind without refreshing the page! None now supported
  in non-required multiple choice product options

### Fixed
- Navigation links should work across screen sizes no matter what, now they do

### [1.1.4] - 2017-10-05

### Added
- The page links in the navigation have always been quite shy. Now you have the
  option to make them the main attraction and finally get them out of their
  comfort zone!

### Fixed
- Our "Other Details" section on the product page has been awfully stubborn.
  After we gave it a stern talking to, it has agreed to not appear on the product
  page if it has no content.
- The lists in our product descriptions were looking a little bare. Now they're
  all dressed up with some fancy bullet points!

### [1.1.3] - 2017-09-14

### Changed
- Random banners now showing on a store front near you!
- Fix appearance of the + quantity button in FireFox

### Fixed
- Made related products appear in rows of two on mobile
- Fixed issue with the update cart button occasionally not updating cart

### [1.1.2] - 2017-07-13

### Added
- Added cart-level discounts

### Added
- Added option to show all brands on the brand page (THEME-1319)

### Fixed
- Fixed filter icon getting cut off in Firefox
- Fixed filter labels getting cut off
- Fixed issue where the update cart button would not work with buy one get one
  free items
- Fixed issue where blog images appeared blurry
- Fixed issue where date field year option would not show if the date range was
  within one year (THEME-1331)

### [1.1.1] - 2017-06-01

### Added
- Added new theme description
- Added "Show more" button for faceted search (THEME-1244)

### [1.1.0] - 2017-05-25

#### Added
- Theme support added for optimized checkout

### [1.0.4] - 2017-05-18

#### Changed
- prevent users from opening up the product overlay on mobile

#### Fixed
- fixed an issue where images in the product overlay were not appearing in Safari

### [1.0.3] - 2017-05-04

#### Fixed
 - fixed an issue where customers were getting an error after unsubscribing from
   newsletter (fixes THEME-1269)
 - fixed an issue where the forgot password link wasn't showing in the login
   page (fixes THEME-1288)

#### Changed
 - small improvements to dropdown selects when the selected option has lots of
   text


### [1.0.2] - 2017-03-31
- Theme release
