root = @

views =
        layout: (d) ->
           [['!doctype html']
            ['html'
                ['head'
                    ['meta', charset:'utf-8']
                    ['title', d.title]
                    ['link', {href:'/css/'+css+'.css', rel:'stylesheet', type:'text/css'}] for css in d.css]
                ['body'
                    ['div', id:'main',
                        ['h2', d.title]
                        ['div', id: 'newgame',
                                ['a', href:'#', 'New game']]
                        ['div', id:'gamearea', '']]
                    ['script', src:js+'.js', ''] for js in d.js]]]

root.views = views

