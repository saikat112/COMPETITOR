
    jQuery(document).ready(function($) {

        jQuery("#navbar_top").scrollToFixed();

        $(window).scroll(function () {
            if ($(window).scrollTop() <= 40) {
                //alert();
                $(".menumain").removeClass("scroll_navbar");
            }
            else {
                $(".menumain").addClass("scroll_navbar");
            }
        });

    });


     //INPUT VALIDATION
     document.getElementById('fname').setCustomValidity('Please enter your full name');
     document.getElementById('fcontact').setCustomValidity('Please enter a valid 10-digit mobile number');
     document.getElementById('femail').setCustomValidity('Please enter your email');

     function clearValidityMessage(element) {
         element.setCustomValidity('');
         const value = element.value.toString();
         if (value !== '' && value !== '-' && value !== '+' && value !== 'e' && value !== '-e' && value !== '+e') {
             element.classList.add('has-value');
         } else {
             element.classList.remove('has-value');
         }
     }
     document.getElementById('fcontact').addEventListener('input', function () {
         let phoneValue = this.value;
         let regex = /^\d{10}$/;
         if (!regex.test(phoneValue)) {
             this.setCustomValidity('Please enter a valid 10-digit mobile number');
         } else {
             this.setCustomValidity('');
         }
     });


     function validateEmail(element) {
       const emailValue = element.value;
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

       // Clear any previous validation messages
       element.setCustomValidity('');

       if (emailValue === '') {
           element.setCustomValidity('Email address is required');
       } else if (!emailRegex.test(emailValue)) {
           element.setCustomValidity('Please enter a valid email address');
       } else {
           element.setCustomValidity('');
       }
     }

     // Automatically validate email on blur to improve user experience
     document.getElementById('femail').addEventListener('blur', function () {
         validateEmail(this);
     });
//INPUT VALIDATION


    // <!-----MOBILE CELLNO CHANGE JS----->
    document.addEventListener('DOMContentLoaded', function() {
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(window.location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    
        var mobile = getParameterByName('cellno');
        console.log(`cell no: ${mobile}`); // Debugging log
    
        var callLink = document.getElementById('click_to_call');
        
        console.log(`callLink: ${callLink}`);
    
        if (mobile) {
            var phoneNumber = mobile.startsWith('+91') ? mobile : '+91' + mobile;
            callLink.href = "tel:" + phoneNumber;
            var formattedNumber = phoneNumber.slice(0, 3) + " " + phoneNumber.slice(3, 7) + " " + phoneNumber.slice(7, 10) + " " + phoneNumber.slice(10);
            console.log(`Formatted Number: ${formattedNumber}`); // Debugging log
        }
    });

    // <!-----MOBILE CELLNO CHANGE JS----->


    //MULTIPLE CHECKBOX
    $(document).ready(function () {
        // Function to show table data for a given project
        function showTableForProject(projectName) {
            $("table thead th").each(function (index) {
                if ($(this).text().trim() === projectName) {
                    $(this).show(); // Show the header
                    $("table tbody tr").each(function () {
                        $(this).children("td:nth-child(" + (index + 1) + ")").show(); // Show the column data
                    });
                }
            });
        }
    
        // Function to hide table data for a given project
        function hideTableForProject(projectName) {
            $("table thead th").each(function (index) {
                if ($(this).text().trim() === projectName) {
                    $(this).hide(); // Hide the header
                    $("table tbody tr").each(function () {
                        $(this).children("td:nth-child(" + (index + 1) + ")").hide(); // Hide the column data
                    });
                }
            });
        }
    
        // Initialize the table display to show default projects
        function initializeTable() {
            $("table thead th, table tbody td").hide(); // Hide all headers and data initially
    
            // Always show the first column (e.g., serial numbers or static header)
            $("table thead th").eq(0).show();
            $("table tbody td:nth-child(1)").show();
    
            // Show default projects (Dream Diamond and Emami Aastha)
            const defaultProjects = ["Dream Diamond", "Emami Aastha"];
            defaultProjects.forEach(projectName => {
                showTableForProject(projectName);
                $(".card").each(function () {
                    const cardProjectName = $(this).find("h5").text().trim();
                    if (cardProjectName === projectName) {
                        $(this).find(".form-check-input").prop("checked", true);
                    }
                });
            });
        }
    
        // Add event listener for checkbox changes
        $(".form-check-input").on("change", function () {
            const projectName = $(this).closest(".card-body").find("h5").text().trim();
            const checkedCheckboxes = $(".form-check-input:checked");
    
            if (checkedCheckboxes.length > 4) {
                // Prevent more than 4 checkboxes from being checked
                alert("You can select up to 4 projects only.");
                $(this).prop("checked", false);
                return;
            }
    
            if ($(this).is(":checked")) {
                // Show the table header and data for the selected project
                showTableForProject(projectName);
            } else {
                // Hide the table header and data for the unchecked project
                hideTableForProject(projectName);
            }
        });
    
        // Initialize the table display
        initializeTable();
    });
    
    //MULTIPLE CHECKBOX
    

    //SEARCH PARAMS
    $(document).ready(function () {
        // Function to get URL parameters
        function getURLParams(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }
    
        // Get the project parameter from the URL
        const projectParam = getURLParams('project');
    
        // Function to update table based on selected checkboxes
        function updateTable() {
            const checkedProjects = [];
    
            // Collect all checked checkboxes
            $('.form-check-input:checked').each(function () {
                const projectName = $(this).closest('.card').find('h5').text().trim();
                checkedProjects.push(projectName);
            });
    
            // Show/hide table headers and rows based on selected projects
            $('table th, table td').hide();
            $('table th:first-child, table td:first-child').show(); // Always show the row numbers column
    
            checkedProjects.forEach((project) => {
                const index = $(`table th:contains('${project}')`).index();
                if (index !== -1) {
                    $(`table th:nth-child(${index + 1})`).show();
                    $(`table td:nth-child(${index + 1})`).show();
                }
            });
        }
    
        // Set default checked state based on URL params or fallback to defaults
        if (projectParam) {
            $('.card').each(function () {
                const projectName = $(this).find('h5').text().trim();
                if (projectName === 'Dream Diamond' || projectName === projectParam) {
                    $(this).find('.form-check-input').prop('checked', true);
                } else if (projectName === 'Emami Aastha') {
                    $(this).find('.form-check-input').prop('checked', false);
                } else {
                    $(this).find('.form-check-input').prop('checked', false);
                }
            });
        } else {
            // Default to Dream Diamond and Emami Aastha if no params
            $('.card').each(function () {
                const projectName = $(this).find('h5').text().trim();
                if (projectName === 'Dream Diamond' || projectName === 'Emami Aastha') {
                    $(this).find('.form-check-input').prop('checked', true);
                } else {
                    $(this).find('.form-check-input').prop('checked', false);
                }
            });
        }
    
        // Trigger table update for default selections
        updateTable();
    
        // Add change event listener for checkboxes
        $('.form-check-input').on('change', function () {
            const maxSelection = 4;
            const checkedCount = $('.form-check-input:checked').length;
    
            // Enforce max selection limit
            if (checkedCount > maxSelection) {
                alert(`You can select up to ${maxSelection} projects only.`);
                $(this).prop('checked', false);
            }
    
            // Update table after checkbox state changes
            updateTable();
        });
    
        // Hide Emami Aastha data by default if projectParam is present
        // if (projectParam) {
        //     const emamiIndex = $(`table th:contains('Emami Aastha')`).index();
        //     if (emamiIndex !== -1) {
        //         $(`table th:nth-child(${emamiIndex + 1})`).hide();
        //         $(`table td:nth-child(${emamiIndex + 1})`).hide();
        //     }
        // }
    });

    //SEARCH PARAMS