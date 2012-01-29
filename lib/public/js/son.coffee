root = @


isArray = Array.isArray or ((elem) -> toString.call(elem) is '[object Array]')
toString = Object::toString


Son = ->



    render = (styleSheetArray) ->
        (toCss cssSelectorArray for cssSelectorArray in styleSheetArray).join "\n"



    toCss = (cssSelectorArray, parent = null) ->

       selector = buildSelector(parent, cssSelectorArray[0])

       [selector
       " {\n"
       (buildProperties elem for elem in cssSelectorArray[1..] when toString.call(elem) is '[object Object]').join("")
       "}\n"]
       .concat(toCss(elem, selector) for elem in cssSelectorArray[1..] when isArray(elem)).join ""


    buildSelector = (parent, selector) ->

        if parent?

            selectorParts = selector.split(",") #deal with ", " or "," cases later
            parentParts = parent.split(",")

            (((parent + " " + part) for part in selectorParts).join(", ") for parent in parentParts).join ", "

        else
            selector



    buildPropertyNames = (parentParts = null, cssPropertyNameParts) ->

        if parentParts?
           ([parent].concat(cssPropertyNamePart).join("-") for parent in parentParts).join("") for cssPropertyNamePart in cssPropertyNameParts

        else
            cssPropertyNameParts



    buildProperties = (cssPropertyObj, parent = null) ->

        parentParts = if parent then parent.split(", ") else null

        ((propertyNames = buildPropertyNames(parentParts, cssPropertyName.split(","))

        if isArray(cssPropertyVal)
            (buildProperties(val, propertyNames.join(",")) for val in cssPropertyVal).join ""

        else
            (("  " + propertyName + ": " + cssPropertyVal + ";\n") for propertyName in propertyNames).join ""

        ) for cssPropertyName, cssPropertyVal of cssPropertyObj).join ""



    @render = render

    @



root.Son = new Son()
