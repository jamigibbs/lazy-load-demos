
// Images Example
document.addEventListener('DOMContentLoaded', function() {
  let lazyImages = [...document.querySelectorAll('img.lazy')]
  let active = false

  if ('IntersectionObserver' in window){
    let lazyImageObserver = new IntersectionObserver( (entries) => {
      entries.forEach( entry => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target
          lazyImage.src = lazyImage.dataset.src
          lazyImage.classList.remove('lazy')
          lazyImageObserver.unobserve(lazyImage)
        }
      })
    })

    lazyImages.forEach( lazyImage => lazyImageObserver.observe(lazyImage) )

  } else {
    // For browsers that don't support IntersectionObserver ie. Safari
    const lazyLoad = function() {
      if (active === false){
        active = true

        setTimeout(function() {
          lazyImages.forEach((lazyImage) => {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== 'none') {
              lazyImage.src = lazyImage.dataset.src
              lazyImage.classList.remove('lazy')

              lazyImages = lazyImages.filter((image) => {
                return image !== lazyImage
              })

              if (lazyImages.length === 0) {
                document.removeEventListener('scroll', lazyLoad)
                window.removeEventListener('resize', lazyLoad)
                window.removeEventListener('orientationchange', lazyLoad)
              }
            }
          })

          active = false
        }, 200)
      }
    }

    document.addEventListener('scroll', lazyLoad)
    window.addEventListener('resize', lazyLoad)
    window.addEventListener('orientationchange', lazyLoad)
  }

  // Background images example
  let lazyBackgrounds = [...document.querySelectorAll('.lazy-background')]
  let activeBg = false

  if ('IntersectionObserver' in window) {
    let lazyBackgroundObserver = new IntersectionObserver( entries => {
      entries.forEach( entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          lazyBackgroundObserver.unobserve(entry.target)
        }
      })
    })

    lazyBackgrounds.forEach( lazyBackground => lazyBackgroundObserver.observe(lazyBackground) )
  } else {
    // For browsers that don't support IntersectionObserver ie. Safari
    const lazyLoad = function() {
      if (activeBg === false){
        activeBg = true

        setTimeout(function() {
          lazyBackgrounds.forEach((lazyBackground) => {
            if ((lazyBackground.getBoundingClientRect().top <= window.innerHeight && lazyBackground.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyBackground).display !== 'none') {

              lazyBackground.classList.add('visible')

              lazyBackgrounds = lazyBackgrounds.filter((image) => {
                return image !== lazyBackground
              })

              if (lazyBackgrounds.length === 0) {
                document.removeEventListener('scroll', lazyLoad)
                window.removeEventListener('resize', lazyLoad)
                window.removeEventListener('orientationchange', lazyLoad)
              }
            }
          })

          activeBg = false
        }, 200)
      }
    }

    document.addEventListener('scroll', lazyLoad)
    window.addEventListener('resize', lazyLoad)
    window.addEventListener('orientationchange', lazyLoad)
  }

    // Videos example
    let lazyVideos = [...document.querySelectorAll('video.lazy')]
    let activeVideo = false

    if ('IntersectionObserver' in window) {
      let lazyVideoObserver = new IntersectionObserver((entries) => {
        entries.forEach((video) => {
          if (video.isIntersecting) {

            for (var source in video.target.children) {
              var videoSource = video.target.children[source]
              if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
                videoSource.src = videoSource.dataset.src
              }
            }

            video.target.load()
            video.target.classList.remove('lazy')
            lazyVideoObserver.unobserve(video.target)
          }
        })
      })

      lazyVideos.forEach(lazyVideo => lazyVideoObserver.observe(lazyVideo))

    } else {
      // For browsers that don't support IntersectionObserver ie. Safari
      const lazyLoad = function() {
        if (activeVideo === false){
          activeVideo = true

          setTimeout(function() {
            lazyVideos.forEach((lazyVideo) => {
              if ((lazyVideo.getBoundingClientRect().top <= window.innerHeight && lazyVideo.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyVideo).display !== 'none') {

                for (var source in lazyVideo.children) {
                  let videoSource = lazyVideo.children[source]
                  if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
                    lazyVideo.src = videoSource.dataset.src
                  }
                }

                lazyVideos = lazyVideos.filter((video) => {
                  return video !== lazyVideo
                })

                if (lazyVideos.length === 0) {
                  document.removeEventListener('scroll', lazyLoad)
                  window.removeEventListener('resize', lazyLoad)
                  window.removeEventListener('orientationchange', lazyLoad)
                }
              }
            })

            activeVideo = false
          }, 200)
        }
      }

      document.addEventListener('scroll', lazyLoad)
      window.addEventListener('resize', lazyLoad)
      window.addEventListener('orientationchange', lazyLoad)
    }

})

