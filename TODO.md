# TODO

 - [x] Restyle table to look better on smaller screens (div?)
 - [x] Ability to delete a record
 - [x] Ability to edit a record
 - [x] When adding a record with a date that is already in the list, instead of creating a new record, replace existing one (hint: don't compare "dates" directly, instead compare formatDate(date))
 - [x] make sure that charts ignore records with "empty" values. So if you have `weight: 1, weight: null, weight: 2` it should only render chart for `weight: 1, weight: 2` (you can use filter inside of chart)
 - [x] Ability to switch between different measurements to display in chart.
 - [x] On every new record creation/edit/delete save records to localStorage
 - [x] When app starts check if localstorage is not empty. If it is not empty set initial state. (hint: use `componentWillMount(){...}` on the `App`)
 - [ ] Use `ResponsiveContainer` for chart (hint: http://recharts.org/#/en-US/api/ResponsiveContainer )