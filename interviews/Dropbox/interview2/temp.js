function getImageHash(img)
{
    
}

function transferUniqueImages(source, target) {
    target = target || [];
    var imgList = source.getElementsByTagName('IMG');
    // Stores images we've already seen in dict<str, dict<str, obj>>)
    var avgColorHash = {};
    $.each(imgList, function(i, img) {

        // Get the avg color from image data attribute;
        var avgColorStr = $(img).attr('data-avgcolor');

        if (avgColorHash[avgColorStr])
        {
            tryGetImage(img, function(dataHash) {
                var is_duplicate = false;
                var imagesChecked = 0;
                var check_duplicate = function()
                {
                    if (!is_duplicate && imagesChecked == avgColorHash[avgColorStr].length + 1)
                    {
                        avgColorHash[avgColorStr].push({
                            image: img,
                            hash: dataHash
                        });
                        target.push(img)
                    }
                }
                $.each(avgColorHash[avgColorStr], function(j, previousResult) {
                    if (previousResult.hash == null) 
                    {
                        tryGetImage(previousResult.img, function(previousDataHash)
                        {
                            previousResult.hash = previousDataHash;
                            if (previousResult.hash == dataHash) {
                                is_duplicate = true;
                            }
                            imagesChecked++;
                            check_duplicate();
                        });

                    } else if (previousResult.hash == dataHash) {
                        // Some funkiness going on here. TODO Fix
                        is_duplicate = true;
                        imagesChecked++;
                        check_duplicate()
                    }
                })   
            })
        }
        else
        {
            // Avg color hasn't seen before. This is a non duplicate image.
            avgColorHash[avgColorStr] = [{
                image: img,
                hash: null
            }];
            target.push(img)
        }

    });
}

var tryGetImage = function(img, callback)
{
    try {
        callback(getImageHash(img))
    }
    catch (e)
    {
        // Todo - wait til image is load
        setTimeout(function() {
            tryGetImage(img, callback)
        }, 0);
    }
}




// Pre-async code
// function transferUniqueImages(source, target) {
//     target = target || [];
//     var imgList = source.getElementsByTagName('IMG');
//     // Stores images we've already seen in dict<str, dict<str, obj>>)
//     var avgColorHash = {};
//     $.each(imgList, function(i, img) {

//         // Get the avg color from image data attribute;
//         var avgColorStr = $(img).attr('data-avgcolor');

//         if (avgColorHash[avgColorStr])
//         {

//             var dataHash = getImageHash(img);
            
//             var is_duplicate = false;
//             $.each(avgColorHash[avgColorStr], function(j, previousResult) {
//                 if (previousResult.hash == null) previousResult.hash = getImageHash(previousResult.img)
//                 if (previousResult.hash == dataHash) {
//                     is_duplicate = true;
//                     return false;
//                 }
//             })
//             if (!is_duplicate)
//             {
//                 avgColorHash[avgColorStr].push({
//                     image: img,
//                     hash: dataHash
//                 });
//                 target.push(img)
//             }
//         }
//         else
//         {
//             // Avg color hasn't seen before. This is a non duplicate image.
//             avgColorHash[avgColorStr] = [{
//                 image: img,
//                 hash: null
//             }];
//             target.push(img)
//         }

//     });
// }
