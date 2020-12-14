## 对象diff
#### 代码
```
function funDifference(object, other) {
    let diff = {};
    let vChildren;
    for (var key in object) {
        if (typeof object[key] === "object" && typeof other[key] === "object" && object[key] && other[key]) {
            vChildren = funDifference(object[key], other[key]);
            if (Object.keys(vChildren).length > 0) {
                diff[key] = vChildren;
            }
        } else if (object[key] !== other[key]) {
            diff[key] = {
              before: object[key],
              after:other[key]
            };
 
        }
    }
    return diff;
}

```