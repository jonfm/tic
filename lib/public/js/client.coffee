$ ->

        game = null
        gamearea = $ '#gamearea'

        # todo - tighter jquery / game object integration

        $('#newgame a').on 'click', (evt) ->

                evt.preventDefault()
                game = new tic.game 'Jon','Tim'
                gamearea.html game.render(Don.render)

        $('.tic_cells a').live 'click', (evt) ->

                evt.preventDefault()
                self = $ @
                cell = self.attr('href').substr 1

                game.move game.board.turn + cell
                gamearea.html game.render(Don.render)


