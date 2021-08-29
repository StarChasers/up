const withOptimizedImages = require('next-optimized-images')

module.exports = withOptimizedImages({
  handleImages: ['jpe', 'jpeg', 'png', 'svg'],
})
