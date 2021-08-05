## el-table fixed高度问题

```
async ajustColumnHeight (scope) {
        await this.$nextTick()
        const $tableEl = this.$refs.table.$el
        const targetIndex = scope.$index
        const $leftEls = $tableEl.querySelectorAll('.el-table__fixed .el-table__fixed-body-wrapper tbody tr')[targetIndex]
        const $rightEls = $tableEl.querySelectorAll('.el-table__fixed-right .el-table__fixed-body-wrapper tbody tr')[targetIndex]
        const targetRow = $tableEl.querySelectorAll('.el-table__body-wrapper tbody tr')[targetIndex]
        const height = targetRow.getBoundingClientRect().height
        if ($leftEls) {
          $leftEls.style.height = `${height}px`
        }
        if ($rightEls) {
          $rightEls.style.height = `${height}px`
        }
      }
```

