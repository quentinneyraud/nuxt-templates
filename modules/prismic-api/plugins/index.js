// Utils
import Formatter from './utils/Formatter'

<% _.forEach(options.files, function(file) { %>
import <%= file.method %> from '<%= file.path %>'
<% }); %>

export default (ctx, inject) => {

  Formatter.setPrismic(ctx.app.$prismic)

  inject('api', {
    <% _.forEach(options.files, function(file) { %>
			<%= file.method %>: <%= file.method %>(ctx.app),
		<% }); %>
  })
}
