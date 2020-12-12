class ToggleLike{
    constructor(toggleElememt){
        this.toggler=toggleElememt;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self=this;

            // this is a new way to writing ajax
            $.ajax({
                type:"POST",
                url:$(self).attr('href'),
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted== true){
                    likesCount-=1;
                }else{
                    likesCount+=1;
                }

                $(self).attr('data-likes',likesCount);
                $(self).html(`${likesCount} Likes`);
            })

            .fail(function(errData){
                console.log('error in completing the request');
            });
        });
    }
}