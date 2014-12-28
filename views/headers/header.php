<div id='masthead' class='site-header' role='banner'>
  <%= include_header('masthead') %>
</div>

<nav role='navigation' id='header-navbar' class='navbar navbar-default'>
  <div class='container'>
    <div class='navbar-header'>
      <button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#header-navbar-collapse'>
        <span class='sr-only'>Toggle navigation</span>
        <span class='icon-bar'></span>
        <span class='icon-bar'></span>
        <span class='icon-bar'></span>
      </button>
      <%= include_header('mini-brand') %>
    </div>

    <div class='collapse navbar-collapse' id='header-navbar-collapse'>
      <%= include_header('nav') %>
    </div>
  </div>
</nav>