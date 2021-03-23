const authorization = () =>{
	const STD_HEADERS = {
	  'Accept': '*/*',
	  'Content-Type': 'application/json',
	};

	json = {
		    'phone': "77022150025",
		    'password': "12345"
		}


	const login = (data) => (
	  fetch(
	    'https://ecom.magnum.kz/auth/server/api/v1/security/staff/login'	,
	    {
	      method: 'POST',
	      headers: STD_HEADERS,
	      body: JSON.stringify(data)
	    }
	  )
	);

	login(json)
	    .then(
	       response => {
	        if (response.status !== 200) {
	          response
	            .text()
	            .then(
	             async value => {
	                const errorObject = JSON.parse(value);
	                notification.error({
	                  message: 'Ошибка',
	                  description: errorObject.errorDescr,
	                });
	              }
	            );
	        } else {
	          response
	            .text()
	            .then(
	              value => {
	                const responseObject = JSON.parse(value);
	                let dt = {
	                  token:responseObject.token,
	                  refreshToken:responseObject.refreshToken
	                }
	                localStorage.setItem('token', responseObject.token);

	                Cookies.set('refreshToken', responseObject.refreshToken);
	              }
	            );
	        }
	      },
	  );
    return true;
}