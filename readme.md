http://127.0.0.1:3000/api/v1/user/register(Post type)- Register
Req body:- 
{
    "fullName":"Shuvam",
    "phone":"7050249265",
    "role":"owner",
    "password":"1234"
    
}
Response body:-
{
    "message": "User registered successfully",
    "user": {
        "fullName": "Shuvam",
        "phone": "7050249265",
        "role": "owner",
        "password": "$2b$10$hqCBpOMEzkF2756b8UfdoOOGAUtq02qraxFlxSnfnZ6AXREnK98E.",
        "_id": "68ff220fcec3f136a5c95cc3",
        "createdAt": "2025-10-27T07:41:03.015Z",
        "updatedAt": "2025-10-27T07:41:03.015Z",
        "__v": 0
    }
}
Login
http://127.0.0.1:3000/api/v1/user/login(post)
Request Body:-
{
    "phone":"9093289206",
    "password":"1234"
}
Response body :-
{
    "message": "Login successful"
}
Order Create
http://127.0.0.1:3000/api/v1/order/create (Post)
{
    "items": [
      {
        "itemName": "Chop",
        "quantity": 3,
        "pricePerPiece": 7
      },
       {
        "itemName": "Sondesh",
        "quantity": 2,
        "pricePerPiece": 14
      },
      {
        "itemName": "Pantua",
        "quantity": 6,
        "pricePerPiece": 15
      }
    ],  
    "advancedAmount": 100,
    "customerPhone":"7797026338",
    "deliveryDate":"2025-12-27T12:10:00Z"
  }
  Response body:-
  {
    "message": "Order created successfully",
    "order": {
        "items": [
            {
                "itemName": "Chop",
                "quantity": 3,
                "pricePerPiece": 7,
                "_id": "68ff2523cec3f136a5c95cc8"
            },
            {
                "itemName": "Sondesh",
                "quantity": 2,
                "pricePerPiece": 14,
                "_id": "68ff2523cec3f136a5c95cc9"
            },
            {
                "itemName": "Pantua",
                "quantity": 6,
                "pricePerPiece": 15,
                "_id": "68ff2523cec3f136a5c95cca"
            }
        ],
        "totalAmount": 139,
        "advancedAmount": 100,
        "dueAmount": 39,
        "createdBy": "68fe604ce0df6c1d72e7c901",
        "status": "pending",
        "_id": "68ff2523cec3f136a5c95cc7",
        "createdAt": "2025-10-27T07:54:11.469Z",
        "updatedAt": "2025-10-27T07:54:11.469Z",
        "__v": 0
    }
}
Order List:-
http://127.0.0.1:3000/api/v1/order/list (Get)