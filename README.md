# Password Generator

## Request parameters
| Name  | Value | Default Value | Usage |
|-------|-------|---------------|-------|
| `lower` | `true` or `false` | `true` | `true` for using lowercase characters |
| `upper` | `true` or `false` | `true` | `true` for using uppercase characters |
| `digits` | `true` or `false` | `true` | `true` for using numberic characters |
| `symbols` | any printable ASCII | `@$#~+-*=_` | Will be used in the password |
| `json` | `true` or `false` | `false` | `true` for returning JSON string |
| `length` | any positive number | `20` | Set the password length |
| `count` | `1` to `1000` | `1` | The number of passwords to generate |


## Examples
| Request  | Possible return |
|----------|-----------------|
| `http://example.com/` | `OP@ELrsQwFKH@CNIgRpu`|
| `http://example.com/?count=2&json=true` | `{"passwords":["z215l57k1gt6+Ho~6Bn5","c1YN$jSyExkyXNR8x0z#"]}`|
| `http://example.com/?lower=false&upper=false&symbols=@` | `4618560078988@331@55` |

