<?php
/**
 * Reflection functions used by Unit and Integration Tests
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Traits;

use Parsely\Parsely;
use ReflectionException;
use ReflectionMethod;
use ReflectionProperty;

trait TestsReflection {
	/**
	 * Gets a method from a class. This should be used when trying to access a
	 * private method for testing.
	 *
	 * @param string              $method_name Name of the method to get.
	 * @param class-string|object $class_name  Name of the class the method is in.
	 * @throws ReflectionException The method does not exist in the class.
	 * @return ReflectionMethod
	 */
	public static function get_method( string $method_name, $class_name = Parsely::class ): \ReflectionMethod {
		$method = ( new \ReflectionClass( $class_name ) )->getMethod( $method_name );
		$method->setAccessible( true );

		return $method;
	}

	/**
	 * Gets a property from a class. This should be used when trying to access a
	 * private property for testing.
	 *
	 * @since 3.17.0
	 *
	 * @param string              $property_name Name of the property to get.
	 * @param class-string|object $class_name  Name of the class the property is in.
	 * @throws ReflectionException The property does not exist in the class.
	 * @return ReflectionProperty
	 */
	public static function get_property( string $property_name, $class_name = Parsely::class ) {
		$property = ( new \ReflectionClass( $class_name ) )->getProperty( $property_name );
		$property->setAccessible( true );

		return $property;
	}

	/**
	 * Overrides the value of a private property on a given object. This is
	 * useful when mocking the internals of a class.
	 *
	 * Note that the property will no longer be private after setAccessible is
	 * called.
	 *
	 * @since 3.17.0 Changed the method signature.
	 *
	 * @param object $obj The object instance on which to set the value.
	 * @param string $property_name The name of the private property to override.
	 * @param mixed  $value The value to set.
	 *
	 * @throws ReflectionException The property does not exist in the class.
	 */
	public static function set_private_property( $obj, string $property_name, $value ): void {
		$property = ( new \ReflectionClass( $obj ) )->getProperty( $property_name );
		$property->setAccessible( true );
		$property->setValue( $obj, $value );
	}

	/**
	 * Overrides the value of a protected property on a given object. This is
	 * useful when mocking the internals of a class.
	 *
	 * Note that the property will no longer be protected after setAccessible is
	 * called.
	 *
	 * @since 3.17.0
	 *
	 * @param object $obj The object instance on which to set the value.
	 * @param string $property_name The name of the protected property to override.
	 * @param mixed  $value The value to set.
	 *
	 * @throws ReflectionException The property does not exist in the class.
	 */
	public static function set_protected_property( $obj, string $property_name, $value ): void {
		$reflection = new \ReflectionClass( $obj );
		$property   = $reflection->getProperty( $property_name );
		$property->setAccessible( true );
		$property->setValue( $obj, $value );
	}
}
