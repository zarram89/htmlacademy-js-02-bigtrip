В момент отправки запроса на создание точки интерфейс блокируетсяfailed
Routes (7)
Method	Route Matcher	Stubbed	Alias	#
GET	https://22.objects.htmlacademy.pro/big-trip/points	Yes	getPoints	-
GET	https://22.objects.htmlacademy.pro/big-trip/destinations	Yes	getDestinations	-
GET	https://22.objects.htmlacademy.pro/big-trip/offers	Yes	getOffers	-
GET	https://22.objects.htmlacademy.pro/big-trip/points	Yes	getPoints	1
GET	https://22.objects.htmlacademy.pro/big-trip/destinations	Yes	getDestinations	1
GET	https://22.objects.htmlacademy.pro/big-trip/offers	Yes	getOffers	1
POST	https://22.objects.htmlacademy.pro/big-trip/points	Yes	postPoint	1
test body
1
Given подменяю данные о точках
2
Given подменяю данные о направлениях
3
Given подменяю данные о предложениях
4
Given подменяю данные о точках
5
Given подменяю данные о направлениях
6
Given подменяю данные о предложениях
7
Given сервер не принимает запросы на создание точки
8
Given нахожусь на главной странице сайта
9
visit/
10
When запрос на получение данных завершён
11
wait@getPoints@getDestinations@getOffers
(fetch)GET 200 https://22.objects.htmlacademy.pro/big-trip/points
getPoints
(fetch)GET 200 https://22.objects.htmlacademy.pro/big-trip/destinations
getDestinations
(fetch)GET 200 https://22.objects.htmlacademy.pro/big-trip/offers
getOffers
12
Then на странице '5' элементов '.event'
13
get.event
5
14
assertexpected [ <div.event>, 4 more... ] to have a length of 5
5
15
When кликаю по элементу '.trip-main__event-add-btn'
16
get.trip-main__event-add-btn
17
click{force: true}
18
When заполняю форму
19
get[for*="event-type-toggle"i]
20
click{force: true}
21
get[for*="event-type-train"i]
22
click{force: true}
23
get.event__input--destination
24
click{force: true}
25
get.event__input--destination
26
type{selectAll}{backspace}Full destination
27
get.event__input--price
28
click{force: true}
29
get.event__input--price
30
type{selectAll}{backspace}6000
31
get[id*="event-start-time"i]
32
click{force: true}
33
get.flatpickr-day.today:first
34
click{force: true}
35
get.event__input--destination
36
click{force: true}
37
get[id*="event-end-time"i]
38
click{force: true}
39
get.flatpickr-day.today:last
40
click{force: true}
41
get.numInput.flatpickr-hour:last
42
click{force: true}
43
getbody
44
type{upArrow}
45
get.event__input--destination
46
click{force: true}
47
get.event__offer-selector:nth-child(1) .event__offer-label
48
click{force: true}
49
get.event__offer-selector:nth-child(1) .event__offer-checkbox:checked
50
assertexpected <input#event-offer-train-1.event__offer-checkbox.visually-hidden> to exist in the DOM
51
When кликаю по элементу '.event__save-btn'
52
get.event__save-btn
53
click{force: true}
(fetch)POST 500 https://22.objects.htmlacademy.pro/big-trip/points
postPoint
54
When жду полсекунды
55
wait500
56
Then активирую элемент '.event__reset-btn' с помощью клавиатуры
57
get.event__reset-btn
58
focus
59
type{enter}
60
Then элемент '.event--edit' видим
61
get.event--edit
0
62
assertexpected .event--edit to be visible
AssertionError
Timed out retrying after 4000ms: Expected to find element: .event--edit, but never found it.
cypress/integration/common/element.js:4:20
  2 | 
  3 | Then(/^элемент '(.*)' видим$/, (selector) => {
> 4 |   cy.get(selector).should('be.visible');
    |                    ^
  5 | });
  6 | 
  7 | Then(/^элемент '(.*)' невидим$/, (selector) => { 
View stack trace
 Print to console
В момент отправки запроса на удаление точки интерфейс блокируетсяfailed
Routes (4)
test body
1
Given подменяю данные о точках
2
Given подменяю данные о направлениях
3
Given подменяю данные о предложениях
4
Given сервер не принимает запросы на удаление точки
5
Given нахожусь на главной странице сайта
6
visit/
7
When запрос на получение данных завершён
8
wait@getPoints@getDestinations@getOffers
(fetch)GET 200 https://22.objects.htmlacademy.pro/big-trip/points
getPoints
(fetch)GET 200 https://22.objects.htmlacademy.pro/big-trip/destinations
getDestinations
(fetch)GET 200 https://22.objects.htmlacademy.pro/big-trip/offers
getOffers
9
When кликаю по элементу '.trip-events__list > :nth-child(2) .event__rollup-btn'
10
get.trip-events__list > :nth-child(2) .event__rollup-btn
11
click{force: true}
12
When кликаю по элементу '.event__reset-btn'
13
get.event__reset-btn
14
click{force: true}
(fetch)DELETE 500 https://22.objects.htmlacademy.pro/big-trip/points/point-4
deletePoint
15
When жду полсекунды
16
wait500
17
Then активирую элемент '.trip-events__list > :nth-child(2) .event__rollup-btn' с помощью клавиатуры
18
get.trip-events__list > :nth-child(2) .event__rollup-btn
19
focus
20
type{enter}
21
Then элемент '.event--edit' видим
22
get.event--edit
0
23
assertexpected .event--edit to be visible
AssertionError
Timed out retrying after 4000ms: Expected to find element: .event--edit, but never found it.
cypress/integration/common/element.js:4:20
  2 | 
  3 | Then(/^элемент '(.*)' видим$/, (selector) => {
> 4 |   cy.get(selector).should('be.visible');
    |                    ^
  5 | });
  6 | 
  7 | Then(/^элемент '(.*)' невидим$/, (selector) => { 
View stack trace
 Print to console
В момент отправки запроса на изменение точки форма блокируетсяfailed
Routes (4)
test body
1
Given подменяю данные о точках
2
Given подменяю данные о направлениях
3
Given подменяю данные о предложениях
4
Given сервер не принимает запросы на изменение точки
5
Given нахожусь на главной странице сайта
6
visit/
7
When запрос на получение данных завершён
8
wait@getPoints@getDestinations@getOffers
(fetch)GET 200 https://22.objects.htmlacademy.pro/big-trip/points
getPoints
(fetch)GET 200 https://22.objects.htmlacademy.pro/big-trip/destinations
getDestinations
(fetch)GET 200 https://22.objects.htmlacademy.pro/big-trip/offers
getOffers
9
When кликаю по элементу '.trip-events__list > :nth-child(3) .event__rollup-btn'
10
get.trip-events__list > :nth-child(3) .event__rollup-btn
11
click{force: true}
12
When редактирую точку
13
get[for*="event-type-toggle"i]
14
click{force: true}
15
get[for*="event-type-train"i]
16
click{force: true}
17
get.event__input--destination
18
click{force: true}
19
get.event__input--destination
20
type{selectAll}{backspace}Full destination
21
get.event__input--price
22
click{force: true}
23
get.event__input--price
24
type{selectAll}{backspace}9000
25
get.event__offer-selector:nth-child(1) .event__offer-label
26
click{force: true}
27
get.event__offer-selector:nth-child(1) .event__offer-checkbox:checked
28
assertexpected <input#event-offer-train-1.event__offer-checkbox.visually-hidden> to exist in the DOM
29
When кликаю по элементу '.event__save-btn'
30
get.event__save-btn
31
click{force: true}
(fetch)PUT 500 https://22.objects.htmlacademy.pro/big-trip/points/point-1
updatePoint
32
When жду полсекунды
33
wait500
34
Then активирую элемент '.trip-events__list > :nth-child(3) .event__rollup-btn' с помощью клавиатуры
35
get.trip-events__list > :nth-child(3) .event__rollup-btn
36
focus
37
type{enter}
38
Then элемент '.event--edit' видим
39
get.event--edit
0
40
assertexpected .event--edit to be visible
AssertionError
Timed out retrying after 4000ms: Expected to find element: .event--edit, but never found it.
cypress/integration/common/element.js:4:20
  2 | 
  3 | Then(/^элемент '(.*)' видим$/, (selector) => {
> 4 |   cy.get(selector).should('be.visible');
    |                    ^
  5 | });
  6 | 
  7 | Then(/^элемент '(.*)' невидим$/, (selector) => { 
View stack trace
 Print to console