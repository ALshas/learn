// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>

// <body>

// </body>
// <script>

// </script>

// </html>
// < !--事物 开始的时候 做某件事 结束的时候再做某件事-- >
const perform = (anymethod, wrappers) => {
    wrappers.forEach(wrap => {
        wrap.initilizae();
    });
    anymethod();
    wrappers.forEach(wrap => {
        wrap.close();
    })
}

perform(
    () => {
        console.log('说话')
    }, [
    {
        initilizae() {
            console.log('你好')
        },
        close() {
            console.log('再见')
        }
    },
    {
        initilizae() {
            console.log('你好2')
        },
        close() {
            console.log('再见2')
        }
    }
]
)