/**
 * Simple script to include HTML partials
 * This allows for reusable components like header and footer
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all elements with data-include attribute
    const includes = document.querySelectorAll('[data-include]');
    
    // Process each include
    includes.forEach(element => {
        const file = element.getAttribute('data-include');
        
        // Fetch the partial HTML
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                
                // Execute any scripts in the included HTML
                const scripts = element.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    
                    // Copy all attributes
                    Array.from(script.attributes).forEach(attr => {
                        newScript.setAttribute(attr.name, attr.value);
                    });
                    
                    // Copy the content
                    newScript.innerHTML = script.innerHTML;
                    
                    // Replace the old script with the new one
                    script.parentNode.replaceChild(newScript, script);
                });
            })
            .catch(error => {
                console.error('Error loading partial:', error);
                element.innerHTML = `<p>Error loading ${file}</p>`;
            });
    });
});