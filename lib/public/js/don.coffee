# Don.js templating http://github.com/twfarland

root = @

isArray = Array.isArray or ((elem) -> toString.call(elem) is '[object Array]')
toString = Object::toString

Don = ->


    ###
    renderInner : contentArray -> string
    e.g: ["text",["span","innertext"]] -> "text<span>innertext</span>"
    ###
    renderInner = (contentArray) ->
        ((if isArray(elem) then toHtml(elem) else elem) for elem in contentArray).join ""


    ###
    renderAttrs : object -> string
    e.g: {id:123,class:"someclass"} -> ' id="123" class="someclass"'
    ###
    renderAttrs = (attrObj) ->
        ([" ",attr,'="',val,'"'].join "" for attr, val of attrObj).join ""


    ###
    toHtml : htmlArray -> html
    the main convertor func
    e.g: ["div",["h1","title"],["p","body"]] -> '<div><h1>title</h1><p>body</p></div>'
    ###
    toHtml = (arr) ->

        #[htmlArray]
        if isArray(arr[0])
            (toHtml elem for elem in arr).join ""

        #[]
        else if arr.length is 0
            ""

        else
            #[elementType]
            if arr.length is 1
                ["<",arr[0],">"].join ""

            else
                if toString.call(arr[1]) is '[object Object]'

                    #[elementType, attributes]
                    if arr.length is 2
                        ["<",arr[0],renderAttrs(arr[1]),">"].join ""

                    #[elementType, attributes, content...]
                    else
                        ["<",arr[0],renderAttrs(arr[1]),">",
                         renderInner(arr[2..]),
                         "</",arr[0],">"].join ""

                #[elementType, content...]
                else
                    ["<",arr[0],">",
                    renderInner(arr[1..]),
                    "</",arr[0],">"].join ""



    #expose raw convertor
    @toHtml = toHtml



     #normal render, where closures are used
    @render = (data, template, key) ->

        toHtml template(data, key)

    #renders a template for each item in an array, and collapses into an html string
    @mapRender = (dataArr, template) ->

        (@render(data, template, key) for key, data of dataArr).join ""

    @map = @mapRender




    #calls the template function within the given data object, so its vars are accesed with @
    @renderIn = (data, template, key, parent) ->

        toHtml template.call data, key, parent

    #renders a template within each item in an array, and collapses into an html string
    @mapRenderIn = (dataArr, template, parent) ->

        (@renderIn(data, template, key, parent) for key, data of dataArr).join ""

    @mapIn = @mapRenderIn #alias




    @


#provide to root
root.Don = new Don()
