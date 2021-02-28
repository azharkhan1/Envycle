var url = window.location.href.split(":");
if (url[0]==="https")
{
    url = 'https://envycle.herokuapp.com'
}
else{
    url = "http://localhost:5000"
}

export default url;

