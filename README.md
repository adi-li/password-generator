# Password Generator

## API route

Endpoint: `/api`

### Query parameters
| Name  | Value | Default Value | Usage |
|-------|-------|---------------|-------|
| `lower` | `true` or `false` | `true` | `true` for using lowercase characters |
| `upper` | `true` or `false` | `true` | `true` for using uppercase characters |
| `digits` | `true` or `false` | `true` | `true` for using numberic characters |
| `symbols` | any printable ASCII | `@$#~+-*=_` | Will be used in the password |
| `length` | any positive number | `20` | Set the password length |
| `count` | `1` to `1000` | `10` | The number of passwords to generate |


### Examples


- Return of requesting: `/api`

  ```json
  {
    "passwords": [
      "kazyud5g-GF5RIsWGP~B",
      "mz2vYd0yEpWEqEOkWIB0",
      "j-5f2MJSlI=31m@qY8-m",
      "EL-$Otsj8Qw0eZ=dFWgi",
      "bUx8_4aPN2aHbuqvZ5*=",
      "M2wYMLz@HT-Ld-ED8PPq",
      "h6kEJYum4vczsly@w3Iy",
      "5FoCo0rZjd+IYuWq6xe+",
      "0B5$0x3364WBaQX*l9wf",
      "FJ6ELji-DoA#ni+k7n6d"
    ]
  }
  ```

- Return of requesting: `/api?count=2`

  ```json
  {
    "passwords": [
      "@Ln6UY3zOyJcZwODi2nF",
      "+dhCsBPOBFcuuLb0zrq9"
    ]
  }
  ```

- Return of requesting: `/api?lower=false&upper=false&symbols=@`

  ```json
  {
    "passwords": [
      "@898517776@972050093",
      "6298867@@55581797565",
      "8453775679@993269338",
      "848820@0787569@86463",
      "86240633900954526615",
      "91610816017054@74602",
      "739573@00676@2361463",
      "2085786331426485125@",
      "88779704242434575376",
      "765560@0721@9773@068"
    ]
  }
  ```
