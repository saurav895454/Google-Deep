// Google Dorks Database
const GOOGLE_DORKS = {
    sensitive: {
        title: "Sensitive Files & Data",
        icon: "fas fa-file-lock",
        description: "Discover sensitive files, configurations, and leaked data",
        dorks: [
            {
                query: 'site:example.com -www -shop -share -ir -mfa',
                description: 'Broad domain search with negative filters'
            },
            {
                query: 'site:example.com ext:php inurl:?',
                description: 'PHP files with parameters'
            },
            {
                query: 'site:"example.com" ext:log | ext:txt | ext:conf | ext:cnf | ext:ini | ext:env | ext:sh | ext:bak | ext:backup | ext:swp | ext:old | ext:~ | ext:git | ext:svn | ext:htpasswd | ext:htaccess | ext:json',
                description: 'Configuration files and backups'
            },
            {
                query: 'site:example.com ext:txt | ext:pdf | ext:xml | ext:xls | ext:xlsx | ext:ppt | ext:pptx | ext:doc | ext:docx intext:"confidential" | intext:"Not for Public Release" | intext:"internal use only" | intext:"do not distribute"',
                description: 'Confidential documents'
            },
            {
                query: 'inurl:email= | inurl:phone= | inurl:password= | inurl:secret= inurl:& site:example.com',
                description: 'Sensitive parameters in URLs'
            },
            {
                query: 'site:example.com filetype:sql | filetype:db | filetype:dbf | filetype:mdb',
                description: 'Database files'
            },
            {
                query: 'site:example.com inurl:"/wp-config.php" | inurl:"/.env" | inurl:"/config/"',
                description: 'WordPress and application configuration files'
            },
            {
                query: 'site:example.com "index of" | "parent directory" | "directory listing"',
                description: 'Directory listings'
            },
            {
                query: 'site:example.com filetype:key | filetype:pem | filetype:ppk | filetype:p12 | filetype:pfx | filetype:cer | filetype:crt',
                description: 'Certificate and key files'
            },
            {
                query: 'site:example.com "BEGIN RSA PRIVATE KEY" | "BEGIN DSA PRIVATE KEY" | "BEGIN EC PRIVATE KEY" | "BEGIN OPENSSH PRIVATE KEY"',
                description: 'Private keys in files'
            },
            {
                query: 'site:example.com filetype:properties intext:password | intext:username | intext:pass | intext:secret',
                description: 'Properties files with credentials'
            },
            {
                query: 'site:example.com "robots.txt" | "sitemap.xml" | "crossdomain.xml" | "clientaccesspolicy.xml"',
                description: 'Important configuration files'
            },
            {
                query: 'site:example.com filetype:yaml | filetype:yml intext:"database" | intext:"password" | intext:"secret" | intext:"key"',
                description: 'YAML configuration files with sensitive data'
            },
            {
                query: 'site:example.com "access_token" | "refresh_token" | "client_secret" | "client_id" | "api_secret"',
                description: 'OAuth and API credentials'
            },
            {
                query: 'site:example.com filetype:env | filetype:environment intext:"=" | intext:"password" | intext:"secret"',
                description: 'Environment files with credentials'
            },
            {
                query: 'site:example.com "ftp://" | "sftp://" | "ssh://" | "telnet://" | "rdp://"',
                description: 'Network protocol URLs'
            },
            {
                query: 'site:example.com "BEGIN CERTIFICATE" | "END CERTIFICATE" | "BEGIN PRIVATE KEY" | "END PRIVATE KEY"',
                description: 'SSL certificates and private keys'
            },
            {
                query: 'site:example.com "password reset" | "forgot password" | "change password" | "reset link"',
                description: 'Password reset functionality'
            },
            {
                query: 'site:example.com intext:"Internal Server Error" | intext:"500 Error" | intext:"403 Forbidden" | intext:"404 Not Found"',
                description: 'HTTP error pages with information disclosure'
            },
            {
                query: 'site:example.com filetype:zip | filetype:rar | filetype:tar | filetype:gz | filetype:7z',
                description: 'Archive files potentially containing source code'
            },
            {
                query: 'site:example.com "dump" | "backup" | "export" | "archive" | "snapshot"',
                description: 'Database dumps and backup files'
            },
            {
                query: 'site:example.com "jenkins" | "gitlab" | "bamboo" | "teamcity" | "circleci"',
                description: 'CI/CD platform references'
            },
            {
                query: 'site:example.com "elastic" | "logstash" | "kibana" | "elasticsearch" | "splunk"',
                description: 'Log management and search platforms'
            },
            {
                query: 'site:example.com "docker-compose.yml" | "Dockerfile" | "kubernetes.yaml" | ".dockerignore"',
                description: 'Container configuration files'
            },
            {
                query: 'site:example.com "ansible" | "puppet" | "chef" | "saltstack" | "terraform"',
                description: 'Infrastructure automation tools'
            },
            {
                query: 'site:example.com ".git" | ".svn" | ".hg" | ".bzr" | "version control"',
                description: 'Version control system files'
            },
            {
                query: 'site:example.com "node_modules" | "vendor" | "bower_components" | "packages"',
                description: 'Package manager directories'
            },
            {
                query: 'site:example.com "localhost" | "127.0.0.1" | "0.0.0.0" | "internal network"',
                description: 'Local and internal network references'
            },
            {
                query: 'site:example.com "staging" | "testing" | "development" | "sandbox" | "preprod"',
                description: 'Non-production environment indicators'
            },
            {
                query: 'site:example.com "TODO" | "FIXME" | "BUG" | "HACK" | "NOTE"',
                description: 'Developer comments and notes'
            }
        ]
    },
    vulnerabilities: {
        title: "Vulnerability Parameters",
        icon: "fas fa-shield-virus",
        description: "Parameters commonly vulnerable to injection attacks",
        dorks: [
            {
                query: 'inurl:q= | inurl:s= | inurl:search= | inurl:query= | inurl:keyword= | inurl:lang= inurl:& site:example.com',
                description: 'XSS prone parameters'
            },
            {
                query: 'inurl:url= | inurl:return= | inurl:next= | inurl:redirect= | inurl:redir= | inurl:ret= | inurl:r2= | inurl:page= inurl:& inurl:http site:example.com',
                description: 'Open Redirect prone parameters'
            },
            {
                query: 'inurl:id= | inurl:pid= | inurl:category= | inurl:cat= | inurl:action= | inurl:sid= | inurl:dir= inurl:& site:example.com',
                description: 'SQL Injection prone parameters'
            },
            {
                query: 'inurl:http | inurl:url= | inurl:path= | inurl:dest= | inurl:html= | inurl:data= | inurl:domain= | inurl:page= inurl:& site:example.com',
                description: 'SSRF prone parameters'
            },
            {
                query: 'inurl:include | inurl:dir | inurl:detail= | inurl:file= | inurl:folder= | inurl:inc= | inurl:locate= | inurl:doc= | inurl:conf= inurl:& site:example.com',
                description: 'LFI prone parameters'
            },
            {
                query: 'inurl:cmd | inurl:exec= | inurl:query= | inurl:code= | inurl:do= | inurl:run= | inurl:read= | inurl:ping= inurl:& site:example.com',
                description: 'RCE prone parameters'
            },
            {
                query: 'site:example.com intext:"sql syntax near" | intext:"syntax error has occurred" | intext:"incorrect syntax near" | intext:"unexpected end of SQL command" | intext:"Warning: mysql_connect()" | intext:"Warning: mysql_query()" | intext:"Warning: pg_connect()"',
                description: 'SQL error messages'
            },
            {
                query: 'site:example.com intext:"Warning: include(" | intext:"Warning: require_once(" | intext:"Warning: require(" | intext:"Warning: include_once(" | intext:"failed to open stream"',
                description: 'PHP inclusion errors'
            },
            {
                query: 'inurl:eval= | inurl:exec= | inurl:shell= | inurl:system= | inurl:passthru= | inurl:proc_open= site:example.com',
                description: 'Code execution parameters'
            },
            {
                query: 'inurl:userid= | inurl:user_id= | inurl:customer_id= | inurl:member_id= | inurl:account_id= site:example.com',
                description: 'User ID enumeration parameters'
            },
            {
                query: 'site:example.com inurl:"?id=" | inurl:"?user=" | inurl:"?category=" | inurl:"?product=" | inurl:"?page=" | inurl:"?item="',
                description: 'Common vulnerable parameters'
            },
            {
                query: 'site:example.com intext:"blind sqli" | intext:"sql injection" | intext:"union select" | intext:"1=1" | intext:"or 1=1"',
                description: 'SQL injection indicators'
            },
            {
                query: 'inurl:callback= | inurl:jsonp= | inurl:api_key= | inurl:access_token= | inurl:auth= site:example.com',
                description: 'JSONP and API authentication parameters'
            },
            {
                query: 'inurl:template= | inurl:theme= | inurl:skin= | inurl:style= | inurl:layout= site:example.com',
                description: 'Template and theme injection parameters'
            },
            {
                query: 'site:example.com inurl:"?" intext:"reflection" | intext:"mirror" | intext:"echo" | intext:"print"',
                description: 'Parameter reflection and XSS testing'
            },
            {
                query: 'inurl:debug= | inurl:test= | inurl:demo= | inurl:dev= | inurl:stage= site:example.com',
                description: 'Debug and development parameters'
            },
            {
                query: 'site:example.com inurl:"upload" inurl:"?" intext:"file" | intext:"image" | intext:"document"',
                description: 'File upload vulnerability parameters'
            },
            {
                query: 'inurl:proxy= | inurl:gateway= | inurl:relay= | inurl:forward= | inurl:tunnel= site:example.com',
                description: 'Proxy and tunneling parameters for SSRF'
            },
            {
                query: 'site:example.com "eval(" | "exec(" | "system(" | "shell_exec(" | "passthru(" | "popen("',
                description: 'Dangerous PHP functions indicating RCE risks'
            },
            {
                query: 'inurl:log= | inurl:logs= | inurl:logfile= | inurl:audit= | inurl:trace= site:example.com',
                description: 'Log file access parameters'
            },
            {
                query: 'site:example.com "XMLHttpRequest" | "fetch(" | "axios" | "ajax" | "$.get" | "$.post"',
                description: 'Client-side request patterns for DOM XSS'
            },
            {
                query: 'inurl:admin= | inurl:user= | inurl:username= | inurl:userid= | inurl:uid= site:example.com',
                description: 'User identification parameters'
            },
            {
                query: 'inurl:search= | inurl:query= | inurl:q= | inurl:keyword= | inurl:term= site:example.com',
                description: 'Search functionality parameters'
            },
            {
                query: 'inurl:sort= | inurl:order= | inurl:orderby= | inurl:filter= | inurl:limit= site:example.com',
                description: 'Data manipulation parameters'
            },
            {
                query: 'site:example.com "SELECT * FROM" | "INSERT INTO" | "UPDATE" | "DELETE FROM" | "DROP TABLE"',
                description: 'SQL query fragments in responses'
            },
            {
                query: 'site:example.com "mysql_" | "mysqli_" | "pg_" | "oci_" | "sqlite_" | "mssql_"',
                description: 'Database function calls'
            },
            {
                query: 'site:example.com "Warning:" | "Notice:" | "Error:" | "Fatal error:" | "Parse error:"',
                description: 'PHP error messages'
            },
            {
                query: 'site:example.com "Traceback" | "Exception:" | "Error:" | "AttributeError:" | "ValueError:"',
                description: 'Python error messages'
            },
            {
                query: 'site:example.com "java.lang" | "NullPointerException" | "ClassNotFoundException" | "SQLException"',
                description: 'Java error messages'
            },
            {
                query: 'site:example.com "undefined method" | "undefined variable" | "undefined index" | "undefined offset"',
                description: 'Undefined errors indicating code issues'
            }
        ]
    },
    endpoints: {
        title: "API Endpoints & Services",
        icon: "fas fa-plug",
        description: "API endpoints, REST services, and web services",
        dorks: [
            {
                query: 'site:example.com inurl:api | site:*/rest | site:*/v1 | site:*/v2 | site:*/v3',
                description: 'API endpoints'
            },
            {
                query: 'inurl:apidocs | inurl:api-docs | inurl:swagger | inurl:api-explorer site:"example.com"',
                description: 'API documentation'
            },
            {
                query: 'site:example.com inurl:"/graphql" | inurl:"/graphiql"',
                description: 'GraphQL endpoints'
            },
            {
                query: 'site:example.com filetype:wsdl | inurl:wsdl',
                description: 'SOAP services'
            },
            {
                query: 'site:example.com inurl:"/api/v" | inurl:"/rest/v" | inurl:"/service/v"',
                description: 'Versioned APIs'
            },
            {
                query: 'site:example.com intext:"api key" | intext:"api_key" | intext:"apikey"',
                description: 'API key references'
            },
            {
                query: 'site:example.com inurl:"/oauth" | inurl:"/auth" | inurl:"/token"',
                description: 'Authentication endpoints'
            },
            {
                query: 'site:example.com inurl:"/webhook" | inurl:"/callback"',
                description: 'Webhook endpoints'
            },
            {
                query: 'site:example.com inurl:"/api/users" | inurl:"/api/admin" | inurl:"/api/login" | inurl:"/api/auth"',
                description: 'Authentication API endpoints'
            },
            {
                query: 'site:example.com inurl:"/api/upload" | inurl:"/api/file" | inurl:"/api/download"',
                description: 'File handling API endpoints'
            },
            {
                query: 'site:example.com "X-API-Key" | "Authorization: Bearer" | "API-Token" | "Access-Token"',
                description: 'API authentication headers'
            },
            {
                query: 'site:example.com inurl:"/health" | inurl:"/status" | inurl:"/ping" | inurl:"/version"',
                description: 'Service health endpoints'
            },
            {
                query: 'site:example.com inurl:"/api/test" | inurl:"/api/debug" | inurl:"/api/dev" | inurl:"/api/staging"',
                description: 'Development and testing API endpoints'
            },
            {
                query: 'site:example.com "Content-Type: application/json" | "Accept: application/json" | "application/json"',
                description: 'JSON API responses'
            },
            {
                query: 'site:example.com inurl:"/api/admin" | inurl:"/api/internal" | inurl:"/api/private" | inurl:"/api/management"',
                description: 'Administrative API endpoints'
            },
            {
                query: 'site:example.com "cors" | "Access-Control-Allow-Origin" | "crossorigin" | "withCredentials"',
                description: 'CORS configuration and headers'
            },
            {
                query: 'site:example.com inurl:"/websocket" | inurl:"/ws" | inurl:"/socket.io" | "WebSocket"',
                description: 'WebSocket endpoints'
            },
            {
                query: 'site:example.com inurl:"/metrics" | inurl:"/prometheus" | inurl:"/monitoring" | inurl:"/telemetry"',
                description: 'Monitoring and metrics endpoints'
            },
            {
                query: 'site:example.com "rate limit" | "quota exceeded" | "429" | "too many requests"',
                description: 'Rate limiting information'
            },
            {
                query: 'site:example.com inurl:"/backup" | inurl:"/export" | inurl:"/download" | inurl:"/dump"',
                description: 'Data export and backup endpoints'
            },
            {
                query: 'site:example.com "postman" | "insomnia" | "swagger.json" | "openapi.json" | "api-docs.json"',
                description: 'API documentation and collection files'
            },
            {
                query: 'site:example.com inurl:"/graphql" | "query" | "mutation" | "subscription" | "GraphQL"',
                description: 'GraphQL API endpoints and queries'
            },
            {
                query: 'site:example.com "REST" | "RESTful" | "endpoint" | "resource" | "HTTP methods"',
                description: 'REST API documentation'
            },
            {
                query: 'site:example.com "authentication" | "authorization" | "oauth" | "jwt" | "bearer token"',
                description: 'API authentication methods'
            },
            {
                query: 'site:example.com "rate limiting" | "throttling" | "quota" | "429 error" | "too many requests"',
                description: 'API rate limiting information'
            },
            {
                query: 'site:example.com "webhook" | "callback" | "notification" | "event" | "trigger"',
                description: 'Webhook and event-driven API features'
            },
            {
                query: 'site:example.com "API key" | "client secret" | "access token" | "refresh token"',
                description: 'API credential references'
            },
            {
                query: 'site:example.com "curl" | "HTTP request" | "request example" | "code sample"',
                description: 'API usage examples and code samples'
            },
            {
                query: 'site:example.com "beta" | "alpha" | "experimental" | "preview" | "unstable"',
                description: 'Beta and experimental API features'
            },
            {
                query: 'site:example.com "deprecated" | "legacy" | "obsolete" | "discontinued" | "end of life"',
                description: 'Deprecated API endpoints'
            }
        ]
    },
    errors: {
        title: "Server Errors & Exceptions",
        icon: "fas fa-exclamation-triangle",
        description: "Server errors, exceptions, and debug information",
        dorks: [
            {
                query: 'inurl:"error" | intitle:"exception" | intitle:"failure" | intitle:"server at" | inurl:exception | "database error" | "SQL syntax" | "undefined index" | "unhandled exception" | "stack trace" site:example.com',
                description: 'General server errors'
            },
            {
                query: 'site:example.com "Fatal error:" | "Parse error:" | "Warning:" | "Notice:"',
                description: 'PHP errors'
            },
            {
                query: 'site:example.com "Server Error" | "Runtime Error" | "Microsoft OLE DB Provider" | "ASP.NET" | "Active Server Pages"',
                description: 'ASP.NET errors'
            },
            {
                query: 'site:example.com "java.lang." | "java.util." | "java.io." | "Exception in thread"',
                description: 'Java exceptions'
            },
            {
                query: 'site:example.com "Traceback" | "NameError" | "TypeError" | "ValueError" | "AttributeError"',
                description: 'Python errors'
            },
            {
                query: 'site:example.com "ORA-" | "PLS-" | "TNS-" | "SP2-"',
                description: 'Oracle database errors'
            },
            {
                query: 'site:example.com intitle:"500 Internal Server Error" | intitle:"404 Not Found" | intitle:"403 Forbidden"',
                description: 'HTTP error pages'
            },
            {
                query: 'site:example.com "DEBUG" | "TRACE" | "ERROR" | "WARN" | "INFO" filetype:log',
                description: 'Log files'
            },
            {
                query: 'site:example.com "Node.js" | "Express" | "Mongoose" | "MongoDB" | "Redis" intext:"error"',
                description: 'Node.js and database errors'
            },
            {
                query: 'site:example.com "Laravel" | "Symfony" | "CodeIgniter" | "CakePHP" intext:"error" | intext:"exception"',
                description: 'PHP framework errors'
            },
            {
                query: 'site:example.com "Django" | "Flask" | "FastAPI" | "Tornado" intext:"traceback" | intext:"error"',
                description: 'Python framework errors'
            },
            {
                query: 'site:example.com "Spring" | "Hibernate" | "Struts" | "JSF" intext:"exception" | intext:"error"',
                description: 'Java framework errors'
            },
            {
                query: 'site:example.com "nginx" | "apache" | "IIS" | "lighttpd" intext:"error" | intext:"403" | intext:"500"',
                description: 'Web server error messages'
            },
            {
                query: 'site:example.com "memory leak" | "buffer overflow" | "segmentation fault" | "core dump"',
                description: 'Memory and system errors'
            },
            {
                query: 'site:example.com "timeout" | "connection refused" | "network error" | "socket error"',
                description: 'Network and connection errors'
            },
            {
                query: 'site:example.com "permission denied" | "access denied" | "unauthorized" | "forbidden"',
                description: 'Access control errors'
            },
            {
                query: 'site:example.com "CSRF" | "cross-site" | "XSS" | "injection" | "vulnerable" intext:"error"',
                description: 'Security-related error messages'
            }
        ]
    },
    admin: {
        title: "Admin Panels & Login Pages",
        icon: "fas fa-user-shield",
        description: "Administrative interfaces and authentication pages",
        dorks: [
            {
                query: 'inurl:login | inurl:signin | intitle:login | intitle:signin | inurl:secure site:example.com',
                description: 'Login pages'
            },
            {
                query: 'site:example.com inurl:admin | inurl:administrator | inurl:wp-admin | inurl:phpmyadmin',
                description: 'Admin panels'
            },
            {
                query: 'site:example.com inurl:"/control" | inurl:"/panel" | inurl:"/dashboard" | inurl:"/manage"',
                description: 'Control panels'
            },
            {
                query: 'site:example.com "Select File" | "Browse" | "Drag and drop your file" | "Attach File" | "Select files" | "File upload" | "Upload your file" | "Submit File" | "Upload Documents" | "Upload Image"',
                description: 'File upload forms and endpoints - Part 1'
            },
            {
                query: 'site:example.com "Drop files here to upload" | "Choose files to upload" | "Add File" | "Upload PDF" | "Upload Video" | "Upload Photo" | "Import File" | "Upload Resume"',
                description: 'File upload forms and endpoints - Part 2'
            },
            {
                query: 'site:example.com "Upload files" | "Upload and Submit" | "Choose a file" | "Click to upload" | "Choose an image to upload"',
                description: 'File upload forms and endpoints - Part 3'
            },
            {
                query: 'site:example.com intitle:"Admin" | intitle:"Administrator" | intitle:"Control Panel"',
                description: 'Admin page titles'
            },
            {
                query: 'site:example.com inurl:"/wp-login.php" | inurl:"/wp-admin/" | inurl:"/administrator/"',
                description: 'CMS admin areas'
            },
            {
                query: 'site:example.com intext:"forgot password" | intext:"reset password" | intext:"change password"',
                description: 'Password reset pages'
            },
            {
                query: 'site:example.com inurl:"/cgi-bin/" | inurl:"/scripts/" | inurl:"/bin/"',
                description: 'CGI and script directories'
            },
            {
                query: 'site:example.com "2FA" | "two factor" | "multi-factor" | "MFA" | "authenticator"',
                description: 'Multi-factor authentication references'
            },
            {
                query: 'site:example.com inurl:"/backup" | inurl:"/restore" | inurl:"/recovery" | inurl:"/snapshot"',
                description: 'Backup and recovery systems'
            },
            {
                query: 'site:example.com "maintenance mode" | "under construction" | "coming soon" | "temporarily unavailable"',
                description: 'Maintenance and development pages'
            },
            {
                query: 'site:example.com inurl:"/test" | inurl:"/demo" | inurl:"/sample" | inurl:"/example"',
                description: 'Test and demonstration pages'
            },
            {
                query: 'site:example.com "default password" | "admin:admin" | "root:root" | "password:password"',
                description: 'Default credential references'
            },
            {
                query: 'site:example.com "session" | "cookie" | "token" | "csrf" | "xsrf"',
                description: 'Session and token management'
            },
            {
                query: 'site:example.com inurl:"/setup" | inurl:"/install" | inurl:"/configure" | inurl:"/wizard"',
                description: 'Installation and setup pages'
            },
            {
                query: 'site:example.com "sudo" | "root" | "administrator" | "superuser" | "privilege"',
                description: 'Privileged access references'
            },
            {
                query: 'site:example.com inurl:"/reports" | inurl:"/analytics" | inurl:"/statistics" | inurl:"/dashboard"',
                description: 'Reporting and analytics interfaces'
            }
        ]
    },
    cloud: {
        title: "Cloud Storage & Services",
        icon: "fas fa-cloud",
        description: "Cloud storage buckets and online services",
        dorks: [
            {
                query: 'site:s3.amazonaws.com "example.com"',
                description: 'AWS S3 buckets'
            },
            {
                query: 'site:blob.core.windows.net "example.com"',
                description: 'Azure Blob storage'
            },
            {
                query: 'site:googleapis.com "example.com"',
                description: 'Google Cloud storage'
            },
            {
                query: 'site:drive.google.com "example.com"',
                description: 'Google Drive files'
            },
            {
                query: 'site:dropbox.com/s "example.com"',
                description: 'Dropbox shared files'
            },
            {
                query: 'site:box.com/s "example.com"',
                description: 'Box.com shared files'
            },
            {
                query: 'site:docs.google.com inurl:"/d/" "example.com"',
                description: 'Google Docs'
            },
            {
                query: 'site:firebaseio.com "example.com"',
                description: 'Firebase databases'
            },
            {
                query: 'site:digitaloceanspaces.com "example.com"',
                description: 'DigitalOcean Spaces'
            },
            {
                query: 'site:sharepoint.com "example.com"',
                description: 'SharePoint sites'
            },
            {
                query: 'site:onedrive.live.com "example.com"',
                description: 'OneDrive files'
            },
            {
                query: 'site:dev.azure.com "example.com"',
                description: 'Azure DevOps'
            },
            {
                query: 'site:*.s3.amazonaws.com "example.com" | site:*.s3-us-west-2.amazonaws.com "example.com"',
                description: 'Regional AWS S3 buckets'
            },
            {
                query: 'site:storage.googleapis.com "example.com" | site:*.storage.googleapis.com "example.com"',
                description: 'Google Cloud Storage buckets'
            },
            {
                query: 'site:*.blob.core.windows.net "example.com" | site:*.file.core.windows.net "example.com"',
                description: 'Azure Storage accounts'
            },
            {
                query: 'site:*.amazonaws.com "example.com" "bucket" | "key" | "secret"',
                description: 'AWS services with credentials'
            },
            {
                query: 'site:heroku.com "example.com" | site:*.herokuapp.com "example.com"',
                description: 'Heroku applications'
            },
            {
                query: 'site:*.netlify.app "example.com" | site:*.vercel.app "example.com"',
                description: 'JAMstack hosting platforms'
            },
            {
                query: 'site:*.amazonaws.com "example.com" filetype:json | filetype:xml | filetype:txt',
                description: 'AWS configuration files'
            },
            {
                query: 'site:cloudfront.net "example.com" | site:*.cloudfront.net "example.com"',
                description: 'AWS CloudFront distributions'
            },
            {
                query: 'site:cdn.jsdelivr.net "example.com" | site:unpkg.com "example.com"',
                description: 'CDN hosted files'
            }
        ]
    },
    code: {
        title: "Code Leaks & Repositories",
        icon: "fas fa-code",
        description: "Source code leaks and development platforms",
        dorks: [
            {
                query: 'site:pastebin.com "example.com"',
                description: 'Pastebin leaks'
            },
            {
                query: 'site:github.com "example.com"',
                description: 'GitHub repositories'
            },
            {
                query: 'site:gitlab.com "example.com"',
                description: 'GitLab repositories'
            },
            {
                query: 'site:bitbucket.org "example.com"',
                description: 'Bitbucket repositories'
            },
            {
                query: 'site:jsfiddle.net "example.com"',
                description: 'JSFiddle code'
            },
            {
                query: 'site:codepen.io "example.com"',
                description: 'CodePen projects'
            },
            {
                query: 'site:codebeautify.org "example.com"',
                description: 'Code beautifier'
            },
            {
                query: 'site:repl.it "example.com"',
                description: 'Replit projects'
            },
            {
                query: 'site:stackoverflow.com "example.com"',
                description: 'Stack Overflow mentions'
            },
            {
                query: 'site:gist.github.com "example.com"',
                description: 'GitHub Gists'
            },
            {
                query: 'site:npmjs.com "example.com"',
                description: 'NPM packages'
            },
            {
                query: 'site:packagist.org "example.com"',
                description: 'Composer packages'
            },
            {
                query: 'site:stackoverflow.com "example.com" "password" | "secret" | "key" | "token"',
                description: 'Stack Overflow posts with credentials'
            },
            {
                query: 'site:*.stackexchange.com "example.com" "database" | "connection" | "config"',
                description: 'Stack Exchange network posts'
            },
            {
                query: 'site:glitch.com "example.com" | site:*.glitch.me "example.com"',
                description: 'Glitch projects'
            },
            {
                query: 'site:hastebin.com "example.com" | site:paste.org "example.com"',
                description: 'Paste sites with code'
            },
            {
                query: 'site:*.wordpress.com "example.com" "wp-config" | "database"',
                description: 'WordPress.com blogs with config leaks'
            },
            {
                query: 'site:medium.com "example.com" "api" | "key" | "secret" | "token"',
                description: 'Medium articles with API keys'
            },
            {
                query: 'site:dev.to "example.com" "environment" | "config" | ".env"',
                description: 'Dev.to articles with configuration'
            },
            {
                query: 'site:hashnode.com "example.com" "secret" | "password" | "token"',
                description: 'Hashnode articles with credentials'
            },
            {
                query: 'site:pastebin.com "example.com" | site:ghostbin.com "example.com"',
                description: 'Code paste sites'
            }
        ]
    },
    infrastructure: {
        title: "Infrastructure & Services",
        icon: "fas fa-server",
        description: "Server infrastructure and service discovery",
        dorks: [
            {
                query: 'inurl:test | inurl:env | inurl:dev | inurl:staging | inurl:sandbox | inurl:debug | inurl:temp | inurl:internal | inurl:demo site:example.com',
                description: 'Development environments'
            },
            {
                query: 'site:example.com inurl:"/server-status" | inurl:"/server-info"',
                description: 'Apache server status'
            },
            {
                query: 'site:example.com intitle:"phpinfo()" | intext:"phpinfo()"',
                description: 'PHP info pages'
            },
            {
                query: 'site:example.com inurl:"/phpmyadmin" | inurl:"/pma" | inurl:"/dbadmin"',
                description: 'Database admin tools'
            },
            {
                query: 'site:example.com inurl:"/jenkins" | inurl:"/ci" | inurl:"/build"',
                description: 'CI/CD systems'
            },
            {
                query: 'site:example.com inurl:"/monitoring" | inurl:"/stats" | inurl:"/metrics"',
                description: 'Monitoring systems'
            },
            {
                query: 'site:example.com inurl:"/docker" | inurl:"/kubernetes" | inurl:"/k8s"',
                description: 'Container services'
            },
            {
                query: 'site:example.com filetype:yaml | filetype:yml | filetype:json intext:"password" | intext:"key" | intext:"token"',
                description: 'Configuration files with secrets'
            },
            {
                query: 'site:example.com "nginx.conf" | "apache.conf" | "httpd.conf" | ".htaccess"',
                description: 'Web server configuration files'
            },
            {
                query: 'site:example.com inurl:"/grafana" | inurl:"/kibana" | inurl:"/prometheus" | inurl:"/nagios"',
                description: 'Monitoring and analytics dashboards'
            },
            {
                query: 'site:example.com "redis" | "memcached" | "elasticsearch" | "mongodb" | "cassandra"',
                description: 'Database and caching services'
            },
            {
                query: 'site:example.com inurl:"/consul" | inurl:"/vault" | inurl:"/nomad" | inurl:"/terraform"',
                description: 'HashiCorp infrastructure tools'
            },
            {
                query: 'site:example.com "load balancer" | "proxy" | "reverse proxy" | "gateway"',
                description: 'Load balancing and proxy infrastructure'
            },
            {
                query: 'site:example.com inurl:"/swagger" | inurl:"/api-docs" | inurl:"/redoc" | inurl:"/postman"',
                description: 'API documentation endpoints'
            },
            {
                query: 'site:example.com "microservice" | "service mesh" | "istio" | "linkerd" | "envoy"',
                description: 'Microservices architecture'
            },
            {
                query: 'site:example.com "cluster" | "node" | "pod" | "deployment" | "service" intext:"kubernetes"',
                description: 'Kubernetes cluster information'
            },
            {
                query: 'site:example.com "ssl certificate" | "tls" | "https" | "certificate authority" | "ca cert"',
                description: 'SSL/TLS certificate information'
            }
        ]
    },
    social: {
        title: "Social Media & Public Info",
        icon: "fas fa-share-alt",
        description: "Social media mentions and public information",
        dorks: [
            {
                query: 'site:groups.google.com "example.com"',
                description: 'Google Groups'
            },
            {
                query: 'site:reddit.com "example.com"',
                description: 'Reddit mentions'
            },
            {
                query: 'site:twitter.com "example.com"',
                description: 'Twitter mentions'
            },
            {
                query: 'site:linkedin.com "example.com"',
                description: 'LinkedIn profiles'
            },
            {
                query: 'site:facebook.com "example.com"',
                description: 'Facebook pages'
            },
            {
                query: 'site:youtube.com "example.com"',
                description: 'YouTube videos'
            },
            {
                query: 'site:instagram.com "example.com"',
                description: 'Instagram posts'
            },
            {
                query: 'site:pinterest.com "example.com"',
                description: 'Pinterest boards'
            },
            {
                query: 'site:discord.com "example.com" | site:t.me "example.com"',
                description: 'Discord and Telegram mentions'
            },
            {
                query: 'site:medium.com "example.com" | site:dev.to "example.com"',
                description: 'Developer blogs and articles'
            }
        ]
    },
    security: {
        title: "Security Research",
        icon: "fas fa-search",
        description: "Security research and vulnerability databases",
        dorks: [
            {
                query: 'site:openbugbounty.org inurl:reports intext:"example.com"',
                description: 'Open Bug Bounty reports'
            },
            {
                query: 'site:cve.mitre.org "example.com"',
                description: 'CVE database'
            },
            {
                query: 'site:exploit-db.com "example.com"',
                description: 'Exploit database'
            },
            {
                query: 'site:shodan.io "example.com"',
                description: 'Shodan results'
            },
            {
                query: 'site:censys.io "example.com"',
                description: 'Censys results'
            },
            {
                query: 'site:vulners.com "example.com"',
                description: 'Vulners database'
            },
            {
                query: '"example.com" "bug bounty" | "vulnerability disclosure" | "security report"',
                description: 'Bug bounty programs'
            },
            {
                query: 'site:*/security.txt "example.com"',
                description: 'Security.txt files'
            }
        ]
    },
    advanced: {
        title: "Advanced Search Techniques",
        icon: "fas fa-brain",
        description: "Advanced Google search operators and reconnaissance techniques",
        dorks: [
            {
                query: 'site:example.com intitle:"index of" "parent directory" "size" "last modified" "description"',
                description: 'Detailed directory listings'
            },
            {
                query: 'site:example.com -inurl:www -inurl:mail -inurl:ftp -inurl:localhost -inurl:webmail -inurl:email -inurl:mx',
                description: 'Clean domain search excluding common subdomains'
            },
            {
                query: 'site:example.com intext:"powered by" | intext:"built with" | intext:"running on"',
                description: 'Technology stack disclosure'
            },
            {
                query: 'site:example.com "*confidential*" | "*internal*" | "*private*" | "*classified*"',
                description: 'Sensitive document keywords'
            },
            {
                query: 'site:example.com filetype:pdf | filetype:doc | filetype:xls | filetype:ppt intext:password',
                description: 'Documents containing password references'
            },
            {
                query: 'site:example.com "Contact us" | "About us" | "Team" | "Staff" | "Employees"',
                description: 'Information gathering pages'
            }
        ]
    },
    mobile: {
        title: "Mobile & IoT Security",
        icon: "fas fa-mobile-alt",
        description: "Mobile applications and IoT device security dorks",
        dorks: [
            {
                query: 'site:example.com "android" | "ios" | "mobile app" | "download app"',
                description: 'Mobile application references'
            },
            {
                query: 'site:example.com inurl:"/mobile" | inurl:"/app" | inurl:"/android" | inurl:"/ios"',
                description: 'Mobile-specific endpoints'
            },
            {
                query: 'site:example.com "deep link" | "app link" | "universal link" | "custom scheme"',
                description: 'Mobile deep linking'
            },
            {
                query: 'site:example.com "IoT" | "smart device" | "connected device" | "sensor"',
                description: 'IoT device references'
            },
            {
                query: 'site:example.com "firmware" | "bootloader" | "embedded" | "microcontroller"',
                description: 'Embedded system components'
            },
            {
                query: 'site:example.com "MQTT" | "CoAP" | "LoRaWAN" | "Zigbee" | "Bluetooth"',
                description: 'IoT communication protocols'
            },
            {
                query: 'site:example.com "APK" | "IPA" | "app store" | "play store"',
                description: 'Mobile application packages'
            },
            {
                query: 'site:example.com "push notification" | "FCM" | "APNS" | "mobile notification"',
                description: 'Mobile push notification services'
            },
            {
                query: 'site:example.com "geolocation" | "GPS" | "location services" | "coordinates"',
                description: 'Location-based services'
            },
            {
                query: 'site:example.com "biometric" | "fingerprint" | "face recognition" | "touch id"',
                description: 'Biometric authentication'
            },
            {
                query: 'site:example.com "jailbreak" | "rooting" | "sideload" | "unsigned app"',
                description: 'Mobile security bypass techniques'
            },
            {
                query: 'site:example.com "camera" | "microphone" | "accelerometer" | "device sensor"',
                description: 'Device hardware access'
            },
            {
                query: 'site:example.com "device id" | "uuid" | "android id" | "advertising id"',
                description: 'Mobile device identifiers'
            },
            {
                query: 'site:example.com "mobile SDK" | "react native" | "flutter" | "ionic" | "xamarin"',
                description: 'Mobile development frameworks'
            },
            {
                query: 'site:example.com "keychain" | "keystore" | "secure storage" | "encrypted storage"',
                description: 'Secure mobile storage'
            },
            {
                query: 'site:example.com "NFC" | "near field" | "contactless" | "RFID" | "beacon"',
                description: 'Near-field communication technologies'
            },
            {
                query: 'site:example.com "AR" | "VR" | "augmented reality" | "virtual reality" | "mixed reality"',
                description: 'Augmented and virtual reality features'
            },
            {
                query: 'site:example.com "machine learning" | "AI" | "neural network" | "deep learning"',
                description: 'Artificial intelligence and machine learning'
            },
            {
                query: 'site:example.com "5G" | "LTE" | "WiFi 6" | "cellular" | "network connectivity"',
                description: 'Advanced connectivity technologies'
            },
            {
                query: 'site:example.com "wearable" | "smartwatch" | "fitness tracker" | "health monitor"',
                description: 'Wearable device integration'
            },
            {
                query: 'site:example.com "home automation" | "smart home" | "IoT hub" | "connected devices"',
                description: 'Smart home and automation systems'
            },
            {
                query: 'site:example.com "edge computing" | "fog computing" | "distributed processing"',
                description: 'Edge and distributed computing'
            },
            {
                query: 'site:example.com "mesh network" | "peer-to-peer" | "decentralized" | "distributed network"',
                description: 'Decentralized networking technologies'
            },
            {
                query: 'site:example.com "battery optimization" | "power management" | "energy efficiency"',
                description: 'Power and battery management'
            }
        ]
    },
    crypto: {
        title: "Cryptocurrency & Blockchain",
        icon: "fab fa-bitcoin",
        description: "Cryptocurrency wallets, blockchain, and crypto-related security",
        dorks: [
            {
                query: 'site:example.com "wallet" | "bitcoin" | "ethereum" | "crypto" | "blockchain"',
                description: 'Cryptocurrency references'
            },
            {
                query: 'site:example.com "private key" | "seed phrase" | "mnemonic" | "wallet.dat"',
                description: 'Cryptocurrency private data'
            },
            {
                query: 'site:example.com "metamask" | "coinbase" | "binance" | "ledger" | "trezor"',
                description: 'Cryptocurrency wallet providers'
            },
            {
                query: 'site:example.com "smart contract" | "solidity" | "web3" | "DeFi" | "NFT"',
                description: 'Blockchain development references'
            },
            {
                query: 'site:example.com intext:"1" | intext:"3" | intext:"bc1" intext:"wallet address"',
                description: 'Bitcoin wallet addresses'
            },
            {
                query: 'site:example.com "0x" "ethereum address" | "ETH address" | "ERC-20"',
                description: 'Ethereum wallet addresses'
            },
            {
                query: 'site:example.com "mining" | "hash rate" | "mining pool" | "ASIC" | "GPU mining"',
                description: 'Cryptocurrency mining references'
            },
            {
                query: 'site:example.com "exchange" | "trading" | "orderbook" | "liquidity" | "market maker"',
                description: 'Cryptocurrency exchange references'
            },
            {
                query: 'site:example.com "ICO" | "IEO" | "IDO" | "token sale" | "presale"',
                description: 'Token offering references'
            },
            {
                query: 'site:example.com "staking" | "yield farming" | "liquidity mining" | "governance token"',
                description: 'DeFi protocol references'
            },
            {
                query: 'site:example.com "multisig" | "multi-signature" | "cold wallet" | "hardware wallet"',
                description: 'Advanced wallet security'
            },
            {
                query: 'site:example.com "gas fee" | "gas limit" | "wei" | "gwei" | "transaction fee"',
                description: 'Blockchain transaction costs'
            },
            {
                query: 'site:example.com "oracle" | "chainlink" | "price feed" | "external data"',
                description: 'Blockchain oracle services'
            },
            {
                query: 'site:example.com "fork" | "mainnet" | "testnet" | "layer 2" | "sidechain"',
                description: 'Blockchain network references'
            }
        ]
    }
};

// Advanced Dorks for specific technologies
const TECHNOLOGY_DORKS = {
    wordpress: {
        title: "WordPress Specific",
        dorks: [
            'site:example.com inurl:"/wp-admin/admin-ajax.php"',
            'site:example.com inurl:"/wp-includes/"',
            'site:example.com inurl:"/wp-content/"',
            'site:example.com filetype:php inurl:wp-config',
            'site:example.com intext:"Index of" inurl:wp-content',
            'site:example.com inurl:"/wp-json/wp/v2/users"'
        ]
    },
    drupal: {
        title: "Drupal Specific",
        dorks: [
            'site:example.com intext:"Powered by" & intext:Drupal & inurl:user',
            'site:example.com inurl:"/user/login"',
            'site:example.com inurl:"/admin/config"',
            'site:example.com filetype:module'
        ]
    },
    joomla: {
        title: "Joomla Specific", 
        dorks: [
            'site:example.com inurl:"/administrator"',
            'site:example.com inurl:"/component/"',
            'site:example.com inurl:"option=com_"'
        ]
    }
};

// Export for use in other modules
window.GOOGLE_DORKS = GOOGLE_DORKS;
window.TECHNOLOGY_DORKS = TECHNOLOGY_DORKS;
