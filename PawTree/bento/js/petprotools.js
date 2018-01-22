$(document).ready(function() {
    
    // Social sharing
    var networks = ['twitter','facebook','email'];
    $('.shareContainer .shareLinks').share({
        networks: networks,
        urlToShare: $(this).data('url'),
        title: $(this).data('title'),
        pageDesc: $(this).data('description'),
        media: $(this).data('image')
    });
    
});