let queue = {
  "5817dafb1da5550f5405937f": [
    {
      url: "www.youtube.com/1",
      title: "music1",
      rank: 1,
      added_by: "Soo"
    },
    {
      url: "www.youtube.com/2",
      title: "music2",
      rank: 2,
      added_by: "Ahmad"
    },
    {
      url: "www.youtube.com/3",
      title: "music3",
      rank: 3,
      added_by: "Michael"
    }
  ]
}

let guestList = {
  "5817dafb1da5550f5405937f": [
    "Soo",
    "Ahmad",
    "Michael"
  ]

}


let users = [
  {
    google_id: "1234567890",
    username: "Soo",
    favlist: [
      "www.google.com",
      "www.youtube.com",
      "www.facebook.com"
    ]
  },
  {
    google_id: "1234567890",
    username: "Ahmad",
    favlist: [
      "www.google.com",
      "www.youtube.com",
      "www.facebook.com"
    ]
  },
  {
    google_id: "1234567890",
    username: "Michael",
    favlist: [
      "www.google.com",
      "www.youtube.com",
      "www.facebook.com"
    ]
  }
]

let event = {
  google_id: "1234567890",
  eventName: "codesmtih drinks",
  eventType: "party",
  eventPassword: "1234",
  matchmaking: false,
  eventHistory: []
}

module.exports = {users, event, guestList, queue};
