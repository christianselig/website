jQuery(document).ready(function($) {
	$(".contact-link").click(function() {
		if ($(".contact").css("backgroundColor") != "rgb(59, 148, 44)" && $(".contact").css("backgroundColor") != "rgb(202, 26, 0)") {
			$(".contact").slideToggle(300);
		}
	});

	var $root = $('html, body');

	$('a').click(function() {
	    $root.animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 500);
	    return false;
	});

	$(".contact input[type='submit']").click(function(event) {
		event.preventDefault();

		var nameInput = $.trim($(".contact input[type='text']").val());
		var emailInput = $.trim($(".contact input[type='email']").val());
		var emailRegEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var messageInput = $.trim($(".contact textarea").val());

		var errorMessage = "";

		if (nameInput == "") {
			errorMessage = "You forgot your name!";
		}
		else if (emailInput == "") {
			errorMessage = "You forgot your email!";
		}
		else if (!emailRegEx.test(emailInput)) {
			errorMessage = "That email address isn't valid!";
		}
		else if (messageInput == "") {
			errorMessage = "You forgot a message!";
		}
		else if (nameInput.length > 100 || emailInput.length > 100 || messageInput.length > 50000) {
			errorMessage = "One of your fields is way too long.";
		}

		if (errorMessage == "") {
			var dataString = "name=" + nameInput + "&email=" + emailInput + "&message=" + messageInput;

			$.ajax({
				type: "POST",
				url: "../mail.php",
				data: dataString,
				success: function(data) {
					// Depending on what the PHP script returned, display a message of success or error
					if (data == 1) {
						$(".contact").animate({"backgroundColor":"#3b942c"}, 300);
						$(".introduction").animate({"borderTopColor":"#3b942c"}, 300);
						$(".contact .inner").hide().html("<div class='result-message'><img src='../images/checkmark.png' alt='Checkmark'><p>Success! I'll get back to you as soon as possible.</p></div>").fadeIn(500);
					}
					else {
						$(".contact").animate({"backgroundColor":"#ff8b01"}, 300);
						$(".introduction").animate({"borderTopColor":"#ff8b01"}, 300);
						$(".contact .inner").hide().html("<div class='result-message'><img src='../images/x.png' alt='Checkmark'><p>Dang! Something went wrong. Please <a href='mailto:me@christianselig.com'>email me directly</a> instead.</p></div>").fadeIn(500);
					}

					$(".contact form").fadeOut(300);
					$(".contact").animate({"height":"200px"}, 300);
					$(".contact .inner").addClass("hidden");
				},
				error: function(jqXHR, textStatus, errorThrown) {
					$(".contact").animate({"backgroundColor":"#ff8b01"}, 300);
					$(".introduction").animate({"borderTopColor":"#ff8b01"}, 300);
					$(".contact .inner").css({"width":"500px"});
					$(".contact .inner").hide().html("<div class='result-message'><img src='../images/x.png' alt='Checkmark'><p>Dang! Something went wrong. Please <a href='mailto:me@christianselig.com'>email me directly</a> instead.</p></div>").fadeIn(500);

					$(".contact form").fadeOut(300);
					$(".contact").animate({"height":"200px"}, 300);
					$(".contact .inner").addClass("hidden");
				}
			});
		}
		else {
			$(".contact input[type='submit']").effect("shake", { times:1 }, 200);
			$(".validation-error").html(errorMessage);
		}
	});
});
