
document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // LIKE AND UNLIKE POSTS
    // ==========================

    document.querySelectorAll(".post").forEach(function (post) {

        const likeButton = post.querySelector(".like-btn");
        const likesText = post.querySelector(".likes");
        const originalLikes = parseInt(
            likesText.textContent.replace(/\D/g, ""),
            10
        );

        let liked = false;

        likeButton.addEventListener("click", function () {

            liked = !liked;

            likeButton.classList.toggle("liked", liked);

            if (liked) {
                likeButton.innerHTML = '<i class="bi bi-heart-fill"></i>';
            } else {
                likeButton.innerHTML = '<i class="bi bi-heart"></i>';
            }

            const totalLikes = originalLikes + (liked ? 1 : 0);

            likesText.innerHTML =
                `<strong>${totalLikes.toLocaleString()} likes</strong>`;

        });

    });


    // ==========================
    // SAVE AND UNSAVE POSTS
    // ==========================

    document.querySelectorAll(".save-btn").forEach(function (button) {

        let saved = false;

        button.addEventListener("click", function () {

            saved = !saved;

            if (saved) {
                button.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
            } else {
                button.innerHTML = '<i class="bi bi-bookmark"></i>';
            }

        });

    });


    // ==========================
    // SHOW AND HIDE COMMENTS
    // ==========================

    document.querySelectorAll(".post").forEach(function (post) {

        const commentButton = post.querySelector(".comment-btn");
        const viewComments = post.querySelector(".view-comments");
        const commentsList = post.querySelector(".comments-list");

        function toggleComments() {
            commentsList.classList.toggle("show");
        }

        commentButton.addEventListener("click", toggleComments);
        viewComments.addEventListener("click", toggleComments);

    });


    // ==========================
    // ADD COMMENTS
    // ==========================

    document.querySelectorAll(".comment-form").forEach(function (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const input = form.querySelector("input");
            const comment = input.value.trim();

            if (comment === "") {
                return;
            }

            const post = form.closest(".post");
            const commentsList = post.querySelector(".comments-list");
            const viewComments = post.querySelector(".view-comments");

            const commentElement = document.createElement("p");

            const username = document.createElement("strong");
            username.textContent = "sumithra_g";

            commentElement.appendChild(username);
            commentElement.appendChild(
                document.createTextNode(" " + comment)
            );

            commentsList.appendChild(commentElement);
            commentsList.classList.add("show");

            const count = commentsList.querySelectorAll("p").length;

            viewComments.textContent = `View all ${count} comments`;

            input.value = "";

        });

    });


    // ==========================
    // FOLLOW AND UNFOLLOW
    // ==========================

    document.querySelectorAll(".follow-btn").forEach(function (button) {

        if (button.textContent.trim() === "Switch") {
            return;
        }

        button.addEventListener("click", function () {

            if (button.textContent.trim() === "Follow") {

                button.textContent = "Following";
                button.style.color = "#262626";

            } else {

                button.textContent = "Follow";
                button.style.color = "#0095f6";

            }

        });

    });


    // ==========================
    // SEARCH POSTS
    // ==========================

    const searchButton = document.getElementById("searchBtn");
    const searchBar = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    searchButton.addEventListener("click", function () {

        searchBar.classList.toggle("show");

        if (searchBar.classList.contains("show")) {
            searchInput.focus();
        }

    });

    searchBar.addEventListener("submit", function (event) {

        event.preventDefault();

        const searchValue = searchInput.value.trim().toLowerCase();

        const posts = document.querySelectorAll(".post");

        posts.forEach(function (post) {

            const postContent = post.textContent.toLowerCase();

            if (postContent.includes(searchValue)) {
                post.style.display = "";
            } else {
                post.style.display = "none";
            }

        });

    });

    searchInput.addEventListener("input", function () {

        if (searchInput.value.trim() === "") {

            document.querySelectorAll(".post").forEach(function (post) {
                post.style.display = "";
            });

        }

    });


    // ==========================
    // CREATE POST MODAL
    // ==========================

    const createBtn = document.getElementById("createBtn");
    const mobileCreateBtn = document.getElementById("mobileCreateBtn");
    const createModal = document.getElementById("createModal");
    const closeModal = document.getElementById("closeModal");

    function openModal() {
        createModal.classList.add("show");
    }

    function hideModal() {
        createModal.classList.remove("show");
    }

    createBtn.addEventListener("click", openModal);
    mobileCreateBtn.addEventListener("click", openModal);
    closeModal.addEventListener("click", hideModal);

    createModal.addEventListener("click", function (event) {

        if (event.target === createModal) {
            hideModal();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            hideModal();
        }

    });


    // ==========================
    // CREATE NEW POST
    // ==========================

    const createPostForm = document.getElementById("createPostForm");

    createPostForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const imageUrl = document.getElementById("imageUrl").value.trim();
        const caption = document.getElementById("postCaption").value.trim();

        if (!imageUrl) {
            alert("Please enter an image URL.");
            return;
        }

        const post = document.createElement("article");
        post.className = "post";

        // Create post header
        const header = document.createElement("div");
        header.className = "post-header";

        const user = document.createElement("div");
        user.className = "post-user";

        const avatar = document.createElement("img");
        avatar.src = "https://i.pravatar.cc/100?img=47";
        avatar.alt = "Your profile";

        const userInfo = document.createElement("div");

        const username = document.createElement("h4");
        username.textContent = "sumithra_g";

        const location = document.createElement("p");
        location.textContent = "Original post";

        userInfo.appendChild(username);
        userInfo.appendChild(location);

        user.appendChild(avatar);
        user.appendChild(userInfo);

        const moreButton = document.createElement("button");
        moreButton.className = "more-btn";
        moreButton.innerHTML = '<i class="bi bi-three-dots"></i>';
        moreButton.setAttribute("aria-label", "More options");

        header.appendChild(user);
        header.appendChild(moreButton);

        // Create image
        const image = document.createElement("img");
        image.className = "post-image";
        image.src = imageUrl;
        image.alt = "New Instagram post";

        // Create actions
        const actions = document.createElement("div");
        actions.className = "post-actions";

        const leftActions = document.createElement("div");
        leftActions.className = "left-actions";

        const like = document.createElement("button");
        like.className = "like-btn";
        like.setAttribute("aria-label", "Like post");
        like.innerHTML = '<i class="bi bi-heart"></i>';

        const comment = document.createElement("button");
        comment.className = "comment-btn";
        comment.setAttribute("aria-label", "Comment");
        comment.innerHTML = '<i class="bi bi-chat"></i>';

        const share = document.createElement("button");
        share.className = "share-btn";
        share.setAttribute("aria-label", "Share");
        share.innerHTML = '<i class="bi bi-send"></i>';

        leftActions.appendChild(like);
        leftActions.appendChild(comment);
        leftActions.appendChild(share);

        const save = document.createElement("button");
        save.className = "save-btn";
        save.setAttribute("aria-label", "Save post");
        save.innerHTML = '<i class="bi bi-bookmark"></i>';

        actions.appendChild(leftActions);
        actions.appendChild(save);

        // Create post details
        const details = document.createElement("div");
        details.className = "post-details";

        const likes = document.createElement("p");
        likes.className = "likes";
        likes.innerHTML = "<strong>0 likes</strong>";

        const captionElement = document.createElement("p");
        captionElement.className = "caption";

        const captionUser = document.createElement("strong");
        captionUser.textContent = "sumithra_g";

        captionElement.appendChild(captionUser);
        captionElement.appendChild(
            document.createTextNode(" " + caption)
        );

        const commentsButton = document.createElement("button");
        commentsButton.className = "view-comments";
        commentsButton.textContent = "View all 0 comments";

        const commentsList = document.createElement("div");
        commentsList.className = "comments-list";

        const commentForm = document.createElement("form");
        commentForm.className = "comment-form";

        const commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.placeholder = "Add a comment...";
        commentInput.required = true;
        commentInput.setAttribute("aria-label", "Add a comment");

        const postButton = document.createElement("button");
        postButton.type = "submit";
        postButton.textContent = "Post";

        commentForm.appendChild(commentInput);
        commentForm.appendChild(postButton);

        details.appendChild(likes);
        details.appendChild(captionElement);
        details.appendChild(commentsButton);
        details.appendChild(commentsList);
        details.appendChild(commentForm);

        // Add all elements to post
        post.appendChild(header);
        post.appendChild(image);
        post.appendChild(actions);
        post.appendChild(details);

        // Add new post at the top
        document.getElementById("postsContainer").prepend(post);

        // Activate interactions on the newly created post
        activatePostFeatures(post);

        // Reset form
        createPostForm.reset();
        hideModal();

    });


    // ==========================
    // INTERACTIONS FOR NEW POSTS
    // ==========================

    function activatePostFeatures(post) {

        let liked = false;
        let saved = false;
        let likes = 0;

        const likeButton = post.querySelector(".like-btn");
        const saveButton = post.querySelector(".save-btn");
        const likesText = post.querySelector(".likes");

        likeButton.addEventListener("click", function () {

            liked = !liked;
            likes += liked ? 1 : -1;

            likeButton.classList.toggle("liked", liked);

            likeButton.innerHTML = liked
                ? '<i class="bi bi-heart-fill"></i>'
                : '<i class="bi bi-heart"></i>';

            likesText.innerHTML = `<strong>${likes} likes</strong>`;

        });

        saveButton.addEventListener("click", function () {

            saved = !saved;

            saveButton.innerHTML = saved
                ? '<i class="bi bi-bookmark-fill"></i>'
                : '<i class="bi bi-bookmark"></i>';

        });

        const commentsButton = post.querySelector(".view-comments");
        const commentsList = post.querySelector(".comments-list");

        post.querySelector(".comment-btn").addEventListener("click", function () {
            commentsList.classList.toggle("show");
        });

        commentsButton.addEventListener("click", function () {
            commentsList.classList.toggle("show");
        });

        post.querySelector(".comment-form").addEventListener("submit", function (event) {

            event.preventDefault();

            const input = this.querySelector("input");
            const value = input.value.trim();

            if (!value) return;

            const commentElement = document.createElement("p");
            const username = document.createElement("strong");

            username.textContent = "sumithra_g";

            commentElement.appendChild(username);
            commentElement.appendChild(document.createTextNode(" " + value));

            commentsList.appendChild(commentElement);
            commentsList.classList.add("show");

            commentsButton.textContent =
                `View all ${commentsList.querySelectorAll("p").length} comments`;

            input.value = "";

        });

    }


    // ==========================
    // STORY CLICK
    // ==========================

    document.querySelectorAll(".story").forEach(function (story) {

        story.addEventListener("click", function () {

            const storyName = story.dataset.name;

            alert(storyName + "'s story selected!");

        });

    });

});
