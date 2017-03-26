$(document).ready(function () {
  let token = localStorage.getItem('token')
  if (!token) {
    window.location.href = 'http://127.0.0.1:8080/index.html'
  } else {
    $.ajax({
      url: `http://localhost:3000/api/verify/${token}`,
      success: function (user) {
        if (!user.email) {
          window.location.href = 'http://127.0.0:8080/api/index.html'
        }
      }
    })
    getStickys()
  }
})

$('#logout').click(function () {
  localStorage.clear()
  window.location.href = 'http://127.0.0.1:8080/index.html'
})

function getStickys () {
  $.ajax({
    url: 'http://localhost:3000/api/sticky',
    type: 'GET',
    success: function (stickys) {
      stickys.forEach(function (sticky) {
        $('#sticky').append(`
          <li id="${sticky.slug}">
            <a href="#modalEdit" onclick="getOneSticky('${sticky.slug}')">
              <h2>${sticky.title}</h2>
              <p>${sticky.content}</p>
            </a>
          </li>`)
      })
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function getOneSticky (slug) {
  $.ajax({
    url: `http://localhost:3000/api/sticky/${slug}`,
    type: 'GET',
    success: function (sticky) {
      $('#editTitle').val(sticky.title)
      $('#editContent').val(sticky.content)
      $('#btn-edit').attr('onclick', `editSticky('${slug}')`)
      $('#btn-delete').attr('onclick', `remove('${slug}')`)
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function addSticky () {
  $.ajax({
    url: 'http://localhost:3000/api/sticky',
    type: 'POST',
    data: {
      title: $('#title').val(),
      content: $('#content').val()
    },
    success: function (sticky) {
      $('#sticky').append(`
        <li id="${sticky.slug}">
          <a href="#modalEdit" onclick="getOneSticky('${sticky.slug}')">
            <h2>${sticky.title}</h2>
            <p>${sticky.content}</p>
          </a>
        </li>`)
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function editSticky (slug) {
  $.ajax({
    url: `http://localhost:3000/api/sticky/${slug}`,
    type: 'PUT',
    data: {
      title: $('#editTitle').val(),
      content: $('#editContent').val()
    },
    success: function (memo) {
      $('#sticky').html('')
      getStickys()
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function remove (slug) {
  console.log(slug)
  $.ajax({
    url: `http://localhost:3000/api/sticky/${slug}`,
    type: 'DELETE',
    success: function () {
      $(`#${slug}`).html('')
    },
    error: function (err) {
      console.log(err)
    }
  })
}
