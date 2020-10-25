$(function (){
    loadUserInfo()
        .then(function (response){
            let user = new User(
                response.firstname,
                response.lastname,
                response.email,
                response.avatar
            );
            displayUserInfo(user)
        })
        .catch(function () {
            alert('Error loading user info')
        });

    let color = false;
    $.get('https://private-anon-0457f21cf7-wad20postit.apiary-mock.com/posts', function (respone) {
        for (post of respone) {
            let div = $('<div class="post">');
            let div2 = $('<div class="post-author">')
            let span = $('<span class="post-author-info">')
            let img = $('<img>').attr("src", post.author.avatar);
            let name = $('<small>').text(post.author.firstname + " " + post.author.lastname);
            let time = $('<small>').text(post.createTime)

            span.append(img)
            span.append(name)
            div2.append(span)
            div2.append(time)
            div.append(div2)

            if(post.media!= null) {
                let div3 = $('<div class="post-image">')
                if (post.media.type === "image") {
                    let img2 = $('<img>').attr("src", post.media.url);
                    div3.append(img2)
                    div.append(div3)
                } else {
                    let video = $('<video controls>')
                    let source = $('<source src="" type="video/mp4">').attr("src", post.media.url)
                    video.append(source)
                    div3.append(video)
                    div.append(div3)
                }
            }
            let div4 = $('<div class="post-title">')
            let text = $('<h3>').text(post.text)
            div4.append(text)
            div.append(div4)

            let div5 = $('<div class="post-actions">')
            let button = $('<button type="button" name="like" class="like-button">').text(post.likes)
            button.click(function () {
                if(color === false){
                    color = true;
                    $(this).toggleClass('liked')
                } else{
                    color = false;
                    $(this).toggleClass('liked')
                }
            });
            div5.append(button)
            div.append(div5)
            $('.posts').append(div)
        }
    });

    let follow = false;
    $.get('https://private-anon-0457f21cf7-wad20postit.apiary-mock.com/profiles', function (respone) {
        for (profile of respone) {
            let div = $('<div class="profile">');
            let img = $('<img>').attr("src", profile.avatar);
            let name = $('<h4>').text(profile.firstname + " " + profile.lastname);
            let button = $('<button id="follow-followed">').text("Follow")
            button.click(function () {
                if(follow === false){
                    follow = true;
                    $(this).toggleClass('pressed')
                    $(this).text("Followed")
                } else{
                    follow = false;
                    $(this).toggleClass('pressed')
                    $(this).text("Follow")
                }
            });
            div.append(img)
            div.append(name)
            div.append(button)
            $('.profiles').append(div)
        }
    });
    $('#follow-followed').click(function () {
        if(follow === false){
            follow = true;
            $(this).toggleClass('pressed')
            $(this).text("Followed")
        } else{
            follow = false;
            $(this).toggleClass('pressed')
            $(this).text("Follow")
        }
    });
    $('.avatar #avatar').click(function () {
        $('.info').toggle()
    })

})
function displayUserInfo(user) {
    $('.avatar #avatar').attr("src", user.avatar);
    $('.info #name').text(user.firstname + " " + user.lastname);
    $('.info #email').text(user.email);
}
function loadUserInfo() {
    return $.get(
        {
            url: 'https://private-anon-167edf9ce2-wad20postit.apiary-mock.com/users/1',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('error')
            }
        }
    );
}