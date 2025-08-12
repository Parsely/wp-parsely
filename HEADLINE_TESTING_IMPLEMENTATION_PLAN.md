# Headline Testing Settings Implementation Plan

## Overview

This document outlines the implementation plan for adding Headline Testing settings to the Parse.ly WordPress plugin, based on the [Parse.ly Headline Testing documentation](https://docs.parse.ly/install-headline-testing/).

## Current Plugin Structure Analysis

The Parse.ly WordPress plugin has a well-organized architecture:

1. **Main Plugin Class** (`src/class-parsely.php`) - Core functionality and options management
2. **Settings Page** (`src/UI/class-settings-page.php`) - Main settings interface with sections
3. **Dashboard Page** (`src/UI/class-dashboard-page.php`) - Main dashboard interface
4. **REST API Structure** - Base settings endpoint system for feature-specific settings
5. **Content Helper Features** - Pattern for feature-specific settings with user role permissions

## Implementation Steps

### 1. ✅ Add Headline Testing Options to Main Plugin Class

**File:** `src/class-parsely.php`

**Changes Made:**
- Extended `Parsely_Options` type to include `headline_testing` array
- Added `Parsely_Options_Headline_Testing` type definition
- Added default options for headline testing

**Options Structure:**
```php
'headline_testing' => array(
    'enabled'                 => false,
    'installation_method'     => 'manual', // 'manual', 'one_line', 'advanced'
    'enable_flicker_control'  => false,
    'enable_live_updates'     => false,
    'live_update_timeout'     => 30000, // milliseconds
    'allow_after_content_load' => false,
    'allowed_user_roles'      => array( 'administrator' ),
),
```

### 2. Create Headline Testing Settings Section

**File:** `src/UI/class-settings-page.php`

**New Method:** `initialize_headline_testing_section()`

**Settings Fields:**
- **Enable Headline Testing** (checkbox)
- **Installation Method** (radio buttons: Manual, One-line Snippet, Advanced)
- **Enable Flicker Control** (checkbox, only for Advanced method)
- **Enable Live Updates** (checkbox)
- **Live Update Timeout** (number input, 1000-60000ms, default 30000)
- **Allow After Content Load** (checkbox)
- **User Permissions** (checkboxes for user roles)

### 3. Create Headline Testing Settings Endpoint

**File:** `src/rest-api/settings/class-endpoint-headline-testing-settings.php`

**Extends:** `Base_Settings_Endpoint`

**Methods:**
- `get_meta_key()` - Returns 'headline_testing'
- `get_subvalues_specs()` - Defines valid values for each setting
- `validate_settings()` - Custom validation logic

### 4. Register Headline Testing Settings Endpoint

**File:** `src/rest-api/settings/class-settings-controller.php`

**Add to endpoints array:**
```php
new Endpoint_Headline_Testing_Settings( $this ),
```

### 5. Create Headline Testing Feature Class

**File:** `src/class-headline-testing.php`

**Extends:** `Content_Helper\Common\Content_Helper_Feature`

**Methods:**
- `get_feature_filter_name()` - Returns 'wp_parsely_headline_testing'
- `get_script_id()` - Returns 'parsely-headline-testing'
- `get_script_url()` - Returns the script URL based on settings
- `should_initialize()` - Checks if feature should be enabled

### 6. Create Headline Testing Script Generator

**File:** `src/class-headline-testing-script.php`

**Methods:**
- `generate_one_line_script()` - Generates one-line snippet
- `generate_advanced_script()` - Generates advanced installation script
- `get_script_url()` - Returns the appropriate script URL
- `validate_settings()` - Validates configuration

### 7. Add Headline Testing to Plugin Initialization

**File:** `wp-parsely.php`

**Add to initialization:**
```php
$headline_testing = new Headline_Testing( $parsely );
$headline_testing->run();
```

### 8. Create Frontend Script Injection

**File:** `src/class-headline-testing.php`

**Method:** `inject_headline_testing_script()`

**Logic:**
- Check if feature is enabled
- Check user permissions
- Generate appropriate script based on installation method
- Inject script into `<head>` section

### 9. Add Settings Validation

**File:** `src/UI/class-settings-page.php`

**Method:** `validate_headline_testing_section()`

**Validation Rules:**
- Installation method must be valid
- Live update timeout must be between 1000-60000ms
- At least one user role must be selected
- Flicker control only available with Advanced method

### 10. Create Settings UI Components

**Files:**
- `src/content-helper/headline-testing/components/headline-testing-settings.tsx`
- `src/content-helper/headline-testing/components/installation-method-selector.tsx`
- `src/content-helper/headline-testing/components/script-preview.tsx`

## Configuration Options Based on Documentation

### Installation Methods

1. **One-line Snippet:**
   ```html
   <script src="https://experiments.parsely.com/vip-experiments.js?apiKey=XXXXX" data-enable-live-updates="true"></script>
   ```

2. **Advanced Installation:**
   ```javascript
   <script>
   !function(){"use strict";var e=window.VIP_EXP=window.VIP_EXP||{config:{}};e.loadVIPExp=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t&&(e.config=n,e.config.apikey=t,function(e){if(!e)return;var t="https://experiments.parsely.com/vip-experiments.js"+"?apiKey=".concat(e),n=document.createElement("script");n.src=t,n.type="text/javascript",n.fetchPriority="high";var i=document.getElementsByTagName("script")[0];i&&i.parentNode&&i.parentNode.insertBefore(n,i)}(t),n.enableFlickerControl&&function(){var t,n;if(null!==(t=performance)&&void 0!==t&&null!==(n=t.getEntriesByName)&&void 0!==n&&null!==(n=n.call(t,"first-contentful-paint"))&&void 0!==n&&n[0])return;var i="vipexp-fooc-prevention";e.config.disableFlickerControl=function(){var e=document.getElementById(i);null!=e&&e.parentNode&&e.parentNode.removeChild(e)};var o=document.createElement("style");o.setAttribute("type","text/css"),o.appendChild(document.createTextNode("body { visibility: hidden; }")),o.id=i,document.head.appendChild(o),window.setTimeout(e.config.disableFlickerControl,500)}())},e.loadVIPExp("XXXXXXXX",{enableFlickerControl: true})}();
   </script>
   ```

### Configuration Options

1. **Enable Flicker Control** - Hides page body for up to 500ms to prevent flickering
2. **Live Updates** - Watches page for new anchors and updates headlines automatically
3. **Live Update Timeout** - How long to watch for new content (default: 30 seconds)
4. **Allow After Content Load** - Bypass First Contentful Paint checks

## User Interface Design

### Settings Page Section

The Headline Testing section should be added to the main settings page with:

1. **Enable/Disable Toggle** - Master switch for the feature
2. **Installation Method Selector** - Radio buttons for different installation methods
3. **Configuration Options** - Conditional fields based on selected method
4. **User Permissions** - Checkboxes for allowed user roles
5. **Script Preview** - Live preview of generated script
6. **Help Text** - Links to documentation and troubleshooting

### Dashboard Integration

Add a Headline Testing tab to the main dashboard with:

1. **Status Overview** - Current configuration status
2. **Test Results** - Integration with Parse.ly API for test data
3. **Configuration Summary** - Current settings display
4. **Quick Actions** - Enable/disable, regenerate script

## Security Considerations

1. **User Role Validation** - Ensure only authorized users can access settings
2. **Nonce Verification** - All form submissions must include nonces
3. **Capability Checks** - Use `manage_options` capability for settings
4. **Input Sanitization** - All user inputs must be properly sanitized
5. **Output Escaping** - All outputs must be properly escaped

## Testing Strategy

### Unit Tests

1. **Settings Validation** - Test all validation rules
2. **Script Generation** - Test script generation for each method
3. **User Permissions** - Test role-based access control
4. **Configuration Options** - Test all configuration combinations

### Integration Tests

1. **Settings Page** - Test settings page functionality
2. **REST API** - Test settings endpoint
3. **Script Injection** - Test frontend script injection
4. **User Interface** - Test React components

### End-to-End Tests

1. **Complete Setup Flow** - Test from settings to script injection
2. **Configuration Changes** - Test updating settings
3. **User Role Changes** - Test permission updates

## Documentation Requirements

1. **User Documentation** - How to configure and use Headline Testing
2. **Developer Documentation** - API documentation for the feature
3. **Troubleshooting Guide** - Common issues and solutions
4. **Migration Guide** - How to migrate from manual installation

## Future Enhancements

1. **A/B Testing Integration** - Direct integration with Parse.ly A/B testing
2. **Analytics Dashboard** - Headline testing performance metrics
3. **Automated Optimization** - AI-powered headline suggestions
4. **Multi-site Support** - Network-wide configuration options

## Implementation Timeline

1. **Phase 1** (Week 1-2): Core settings structure and validation
2. **Phase 2** (Week 3-4): Script generation and injection
3. **Phase 3** (Week 5-6): User interface and dashboard integration
4. **Phase 4** (Week 7-8): Testing and documentation
5. **Phase 5** (Week 9): Final review and deployment

## Dependencies

- WordPress 6.0.0+
- PHP 7.4+
- React (for UI components)
- Parse.ly API access
- User role management system

## Notes

- Follow existing plugin patterns for consistency
- Maintain backward compatibility
- Use WordPress coding standards
- Implement proper error handling
- Add comprehensive logging for debugging
