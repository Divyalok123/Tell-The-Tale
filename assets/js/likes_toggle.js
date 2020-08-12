class likesToggle {
    constructor(element) {
        this.element = element;
        this.togglelikes();
    }

    togglelikes() {
        $(this.element).click(function(e){
            e.preventDefault();

            let self = this;

            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
            }).done(function(data){
                let likesCount = parseInt($(self).attr('id'));
                console.log(likesCount);
                if(data.data.previouslyLiked)
                    likesCount--;
                else likesCount++;

                $(self).attr('id', likesCount);
                $(self).html(`${likesCount} <i class="far fa-thumbs-up"></i>`);
            }).fail(function(err){
                console.log('!!Error occured in likesToggle!!', err);
            });

        });
    }
}