var STATIC_CANDIDATES = [
  [
    "hello",
    true
  ],
  [
    {
      "foo": "bar"
    },
    true
  ],
  [
    "{'json': \"blob\"}",
    false
  ],
  [
    [
      "Ford",
      "BMW",
      "Fiat"
    ],
    true
  ],
  [
    "{a}",
    false
  ],
  [
    "{\"hello\": world\"}",
    false
  ],
  [
    {
      "apples": "3",
      "fish": 15,
      "kittens": "nineteen"
    },
    true
  ],
  [
  	"{\"fig_puddings\"; 6", false
  ]
]
