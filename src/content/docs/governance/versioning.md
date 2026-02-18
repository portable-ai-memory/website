---
title: Versioning Policy
description: Versioning policy for the PAM specification, including backward compatibility and deprecation rules
---

PAM follows semantic versioning for the specification:

## Major Versions (e.g., 1.0 → 2.0)

Breaking changes to required fields or schema structure. Examples:

- Removing or renaming required fields
- Changing the structure of core objects
- Modifying the content hash algorithm

Major versions get a new permanent URL (e.g., `/spec/v2.0`). Previous versions remain accessible.

## Minor Versions (e.g., 1.0 → 1.1)

Backwards-compatible additions. Examples:

- New optional fields
- New memory types
- New relation types
- Additional provider mappings

Existing valid PAM files remain valid under minor version updates.

## Patch Versions (e.g., 1.0.0 → 1.0.1)

Clarifications and errata only. No changes to the schema or required behavior.

## Process

1. Changes are proposed via GitHub issues
2. Discussion happens publicly on the issue
3. Spec changes are submitted as pull requests
4. PRs require a public review period before merging
5. New versions are tagged in the spec repository
