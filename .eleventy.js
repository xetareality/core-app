const htmlmin = require('html-minifier')
const now = String(Date.now())

module.exports = function (eleventyConfig) {
    eleventyConfig.setTemplateFormats(['njk', 'html']);

    eleventyConfig.addPassthroughCopy('src/CNAME');
    eleventyConfig.addPassthroughCopy('src/styles');
    eleventyConfig.addPassthroughCopy('src/scripts');
    eleventyConfig.addPassthroughCopy('src/media');
    eleventyConfig.addPassthroughCopy({'./node_modules/alpinejs/dist/cdn.js': 'scripts/alpine.js'})

    eleventyConfig.addShortcode('version', function () {return now})
    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
        
        if (process.env.ELEVENTY_PRODUCTION && outputPath && outputPath.endsWith('.html')) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            })

            return minified
        }

        return content
    })

    return {
        htmlTemplateEngine: 'njk',
        dir: {
            input: "src",
            output: "dist",
        }
    }
}