
# PROJECT NAME

---

Name: Connor Petrelle 

Date: April 12th 2019

Project Topic: Textbooks for Sale or Rent

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: id            `Type: Number`
- `Field 2`: name          `Type: String`
- `Field 3`: price         `Type: Number`
- `Field 4`: condition     `Type: Number`
- `Field 5`: courses       `Type: [String]`
- `Field 6`: email         `Type: String`
- `Field 7`: date_posted   `Type: String`
- `Field 8`: rent          `Type: Boolean`
- `Field 9`: return_date   `Type: String`


Schema: 
```javascript
{
   id: Number,
   name: String,
   price: Number,
   condition: Number,
   courses: [String],
   email: String,
   date_posted: String,
   rent: Boolean,
   return_date: String
}
```

### 2. Add New Data

HTML form route: `/add-book`

POST endpoint route: `/api/add-book`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/add-book',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: {
      id: 6,
      name: 'Business Statistics',
      price: 42.50,
      condition: 5,
      courses: [ 'BMGT230' ],
      email: 'test@gmail.com',
      date_posted: '2019-04-12T07:53:45.847Z',
      rent: true,
      return_date: '2020-01-01T23:59:59.999Z' 
   }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/alphabetical`

### 4. Search Data

Search Field: `name`, `courses`

### 5. Navigation Pages

Navigation Filters
1. By Price -> `/price`
2. By Condtion -> `/condition`
3. Rentals Only -> `/rental`
4. For Sale Only -> `/purchase`
5. Alphabetical Books -> `/alphabetical`

