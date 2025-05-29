# Changelog

## [2.1.0](https://github.com/itsdonnix/itsdonnix.github.io/releases/tag/v2.1.0) - 2025-05-29

### Added

- **Conditional Google Tag Manager (GTM) Integration**:

  - Added `GTM_ID` parameter to `config.yaml` to conditionally include GTM.
  - Ensures GTM is only loaded if a valid GTM ID is provided.

- **Conditional Social Links**:

  - Made social links (GitHub and Twitter) conditional based on the presence of `github_username` and `twitter_username` in `config.yaml`.
  - Allows for flexible and dynamic rendering of social links.

### Changed

- **Improved Dark Mode Handling**:

  - Simplified dark mode toggle logic using `classList.toggle`.
  - Streamlined event listener handling and added null checks for DOM elements to prevent runtime errors.
  - Used `localStorage.setItem` for better readability and maintainability.

- **Use of URL API for HLJS Theme Path Generation**:

  - Replaced string-based URL manipulation with the standard `URL` API for generating HLJS theme paths.
  - Improves reliability and readability, handling edge cases like query strings or hash fragments more robustly.

- **Reordered Utility Classes**:

  - Reordered utility classes in the `<footer>` and child `<div>` for consistency and readability.

- **Switch from `pnpm` to `npm`**:

  - Switched from `pnpm` to `npm` and updated the `package-lock.json` file.
  - Simplified dependency management by using a widely adopted package manager and ensured consistency across the project.

- **Consistent Script Names in `package.json`**:

  - Updated script names to be consistent (e.g., `build:test` to `build:dev`).
  - Ensured that script names are intuitive and follow a consistent naming convention, making the build process easier to understand and maintain.

- **Refactored Build Scripts**:

  - Added `build:site` and `build:css` scripts for better organization.
  - Updated `build` and `build:dev` scripts to use `npm run build:css` consistently.

- **Refactored Dark Mode Script**:
  - Cached `localStorage` access for clarity.
  - Removed unnecessary optional chaining for event listener.
  - Improved code readability and maintainability.

### Fixed

- **CSS Simplifications**:

  - Simplified transition properties and removed redundant `will-change` properties.
  - Improved performance by reducing unnecessary GPU resource usage and maintaining cleaner CSS.

- **Removed Unnecessary Fields**:

  - Removed the `main` field from `package.json`.
  - Updated the `private` field to a boolean value.

- **Corrected Indentation**:

  - Corrected indentation for `notes` permalink in `config.yaml`.

- **Config**:
  - Updated TailwindConfig import type to Config in `tailwind.config.js` to align with the latest Tailwind CSS configuration type definitions.

[2.1.0]: https://github.com/itsdonnix/itsdonnix.github.io/releases/tag/v2.1.0
